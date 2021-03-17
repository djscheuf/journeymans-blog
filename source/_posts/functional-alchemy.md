---
title: Functional Alchemy
categories:
  - Software Development
  - Tools
tags:
  - transformation
  - functional
  - design
date: 2021-03-17 09:00:00
photos:
  - img/post_img/alembic.png
---

While reading through the Pragmatic Programmer, I happened upon a section which discussed an alternative model for looking at our code. Rather than looking at it as a series of object interactions, this passage advocated for thinking in terms of Data-transformations, and about how the data would flow through each transformation from input to output. I've been using a variation of this model for a long while, though I did not know it. In fact I used to call it _'Functional Alchemy'_ because it reminded me of the hunt for the Philosopher's stone, and the transmutation of the elements. I recall leveraging it for mapping computations for data going into Redux store and from there into React Components so that only subsets would be used at a given moment.

I want to spend some time now to discuss how you too could apply this model by way of an example. I will start with notational structure. When you see (A, B) => c, you should read this as **"There is a function that given A and B inputs can produce/find C"**.

For my part, I tend to enumerate the set of function starting at the Top, or with my inputs. But I always note my desired output as me second step. In order to get anyway, you need a goal right? It usually looks like this:

1. I have A and B
2. I need E
3. (A,B) => C
4. (B) => D
5. (C, D) => E

This helps me create my eventual method signature: (A,B) => E, where E is my desired output, and A, B are the necessary inputs to whatever computation I am describing.

Now let us take a practical case:
I want to determine the Taxes Due on an Invoice, which has LineItems, and a Location.

The LineItems have a Unit, RatePerUnit, TotalBillAmount, DiscountAmount, IsExpedited, TotalAfterExpeditedRateApplied and an ExtendedBillAmount. LineItems in this case can have a surcharge if they are expedited.

The Taxes Due for the Invoice must be determined by Location of the Invoice, and the total before any Discounts are applied. Taxes are applied to ExpeditedAmount if a LineItem is Expedited.

With this in mind, let's start with the DesiredOutput: TotalTaxes. Now by construction, we can assume that given an Invoice we can derive the LineItems, so the probable final signature may read: (Invoice) => TotalTaxes

1. I have Invoice, which has LineItems
2. I need Total Taxes

Now, Per the problem description, Taxes are derived from Either ExpeditedTotals or from TotalBill Amount, depending on whether the the LineItem was Expedited. LineItems show us Expedited or No by a Boolean so we can get the two lists rather simply from LineItems.

1. I have Invoice, which has LineItems
2. I need Total Taxes
3. Invoice => LineItems
4. LineItems => RegularLineItems
5. LineItems => ExpeditedLineItems

From what we have, and the basic model for LineItems, the Expedited Function (#5)would be equivalent to

```javascript
lineItems.filter((li) => li.IsExpedited);
```

Thinking functionaly, the next step would be a reduce, since we want to Sum of the Taxable Amount for both LineItems and ExpeditedLineItems. We could handle this in a couple of ways, but let's favor simplicity of explanation for now.

1. I have Invoice, which has LineItems
2. I need Total Taxes
3. Invoice => LineItems
4. LineItems => RegularLineItems
5. LineItems => ExpeditedLineItems
6. RegularLineItems => RegularTaxableSubtotal
7. ExpeditedLineTimes => ExpeditedTaxableSubtotal

For Function #6, this might look like:

```javascript
regularLineItems.map((rli) => rli.TotalBillAmount).reduce((a, b) => a + b, 0);
```

Now we're within inches of our final transformation, but we'll need to get the TaxRate for the Location of the Invoice. Presuming this is a simple lookup, we add two additional functions:

1. I have Invoice, which has LineItems
2. I need Total Taxes
3. Invoice => LineItems
4. LineItems => RegularLineItems
5. LineItems => ExpeditedLineItems
6. RegularLineItems => RegularTaxableSubtotal
7. ExpeditedLineTimes => ExpeditedTaxableSubtotal
8. Invoice => Location
9. Location => ApplicableTaxRate

With this last piece of data ready, and the TaxableSubTotals, we can finally transform into our TotalTaxes:

1. I have Invoice, which has LineItems
2. I need Total Taxes
3. Invoice => LineItems
4. LineItems => RegularLineItems
5. LineItems => ExpeditedLineItems
6. RegularLineItems => RegularTaxableSubtotal
7. ExpeditedLineTimes => ExpeditedTaxableSubtotal
8. Invoice => Location
9. Location => ApplicableTaxRate
10. (RegularTaxableSubtotal, ExpeditedTaxableSubtotal, ApplicableTaxRate) => TotalTaxes

I want to point out a couple facets of this approach, which only became obvious to me after extended use. First, this approach has you focusing solely on Data, transformations and flow. It provides a simple and clean way to describe the operation, and it can be tempting to try to force all interactions into this model. Be cautious. Not all computing problems are created equal, and this model is useful for some, but should never be the _only_ model you apply.

With that said, this model is exceptionally useful for breaking down complex computational problems. The Example is admittedly contrived. But consider that at no time did we need to consider the implementation details of Getting the Applicable TaxRate given a Location. Nor did we dive into the Total Tax computation, it might have been a simple multiplication. It might be some step-function or any other thing, depending on what 'ApplicableTax' rate actually is. The model, and form of operational description allows us to hide significant information about our problem by abstracting it into a named component, which we can pipe to the necessary place.

Another useful facet, which in part derives from the the abstraction mentioned above, is that this method allows you to jump around a bit. While in my example I derived the Taxable Subtotals first, if that computation had been more difficult, the method could easily hide that complexity behind 'LineItmes => TaxableSubtotal', while you continued to design the rest of the flow around that unknown. Like water navigating around a stone in it's path, you are free to encounter unknowns and pivot around them, by wrapping them in a neat little bundle of inputs and outputs. Oh I need Y? I know I can get them from X, but I don't want to think about that for now... So given X I can get Y, (X) => Y

So, while I wouldn't recommend this model for say... an Event-Driven Workflow, consider giving it a shot before you design your next computational method. Things like TaxCalculation or determining a complex enable/disable behavior might be good candidates. Meanwhile, I hope this example proves useful, and if nothing else interesting. May it make for some delightful development in your near future!
