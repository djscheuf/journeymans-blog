# Category Selection Prompt for New Blog Posts

**Purpose:** Use this prompt with an AI agent when writing a new blog post to help select the most appropriate category from the approved list.

---

## Prompt for AI Agent

```
I'm writing a new blog post and need help selecting the correct category from my approved category list.

### Approved Categories

My blog has 3 primary categories:

1. **Leadership** - Leadership principles, practices, and organizational dynamics. Includes people management, team development, organizational culture, communication, coaching, and the human side of work.

2. **Engineering** - Software engineering practices, technical processes, and how teams build and deliver software. Includes agile methodologies, testing, architecture decisions, and engineering workflows.

3. **Software** - Software as a business tool, product, or organizational capability. Includes software's role in business strategy, organizational design, AI/technology adoption, and software as an enabler of business outcomes.

### My Blog Post

**Title:** [PASTE YOUR TITLE]

**Content/Summary:** [PASTE YOUR POST CONTENT OR A SUMMARY]

**Tags:** [LIST THE 3 TAGS YOU'VE SELECTED]

### Your Task

1. Read my blog post content
2. Identify the ONE most appropriate category
3. Explain why this category is the best fit
4. Address why the other categories are less appropriate

### Selection Criteria

Use these questions to guide your decision:

1. **What is the primary audience for this post?**
   - Leaders/Managers → Leadership
   - Engineers/Developers → Engineering
   - Business/Technology Leaders → Software

2. **What is the main takeaway?**
   - How to lead/manage people → Leadership
   - How to build/test/deliver software → Engineering
   - How software fits into business strategy → Software

3. **What domain does the solution live in?**
   - People and organizational systems → Leadership
   - Technical practices and processes → Engineering
   - Business strategy and technology decisions → Software

### Output Format

Provide your recommendation in this format:

**Recommended Category:** `category-name`

**Primary Rationale:**
[2-3 sentences explaining why this is the best fit based on the post's main focus, audience, and takeaway]

**Why Not the Other Categories:**
- **[Category Name]:** [Brief explanation of why this category is less appropriate]
- **[Category Name]:** [Brief explanation of why this category is less appropriate]

**Confidence Level:** [High/Medium/Low]
[If Medium or Low, explain what makes this a borderline case]
```

---

## Quick Usage

1. **Copy the prompt above**
2. **Fill in your blog post title, content, and tags**
3. **Paste into your AI agent** (ChatGPT, Claude, etc.)
4. **Review the recommendation** and add the category to your frontmatter

---

## Example Usage

### Example 1: Leadership Post

**Input:**
```
Title: On Effective Delegation
Summary: Key to a leader's effectiveness is their ability to work through others. This post 
discusses how to delegate effectively by enabling decisions when you're not in the room, 
requiring shared understanding of what is important and how to measure it.
Tags: leadership, delegation, communication
```

**Output:**
```
Recommended Category: Leadership

Primary Rationale:
This post focuses on a core leadership skill - delegation and working through others. 
The content addresses how leaders can enable their teams to make decisions independently, 
which is fundamentally about people management and organizational effectiveness.

Why Not the Other Categories:
- Engineering: While delegation applies to engineering teams, the post focuses on the 
  leadership practice itself, not engineering-specific processes or technical practices.
- Software: The post doesn't address software's role in business strategy or technology 
  decisions; it's about human leadership capabilities.

Confidence Level: High
```

---

### Example 2: Engineering Post

**Input:**
```
Title: Sprint Demo as a Software Test
Summary: Demonstrations can be used as business-facing tests to critique the product. 
A Demo allows us to validate the team's understanding of the problem and solution. 
What makes a Demo a suitable test? Questions!
Tags: agile, scrum, testing, communication
```

**Output:**
```
Recommended Category: Engineering

Primary Rationale:
This post focuses on a specific engineering practice - using Sprint Demos as a testing 
method. The content is about how engineering teams can improve their testing approach 
and validate their work, which is a core engineering workflow concern.

Why Not the Other Categories:
- Leadership: While demos involve communication, the post's primary focus is on the 
  testing practice itself, not on leading people or managing teams.
- Software: The post doesn't address business strategy or software's organizational role; 
  it's about a specific technical practice within the development process.

Confidence Level: High
```

---

### Example 3: Software Post

**Input:**
```
Title: AI Won't Transform Your Business
Summary: AI won't transform your business - no tool does. Businesses transform when motivated 
people make clever use of new tools. It's about People, Process, Technology in that order. 
The real transformation comes from organizational change, not the technology itself.
Tags: leadership, ai, transformation
```

**Output:**
```
Recommended Category: Software

Primary Rationale:
This post addresses technology adoption and business transformation from a strategic 
perspective. While it mentions leadership, the primary focus is on how organizations 
should think about software/AI as a business capability and the relationship between 
technology and organizational change.

Why Not the Other Categories:
- Leadership: While leadership is mentioned, the post's main argument is about technology's 
  role in business transformation, not about leadership practices or people management.
- Engineering: The post doesn't focus on how to build or use AI tools in development; 
  it's about the business and strategic implications of technology adoption.

Confidence Level: High
```

---

### Example 4: Borderline Case

**Input:**
```
Title: Account for Conway's Law in your Architecture
Summary: Your organizational structure impacts how you can use your tools. The job of custom 
software is to build new verbs for the business. Conway's Law states that organizations 
design systems that mirror their communication structure.
Tags: organizations, effectiveness, architecture
```

**Output:**
```
Recommended Category: Software

Primary Rationale:
This post addresses the relationship between organizational structure and software 
architecture from a business capability perspective. The focus is on how software 
architecture reflects and enables organizational design, which is fundamentally about 
software's role in the organization.

Why Not the Other Categories:
- Leadership: While organizational structure is mentioned, the post's lens is through 
  software architecture, not people management or leadership practices.
- Engineering: The post doesn't focus on technical implementation or engineering practices; 
  it's about the strategic relationship between org design and software systems.

Confidence Level: Medium
This is a borderline case because it touches on both organizational design (Leadership) 
and architecture (Engineering). However, the primary lens is software's role in enabling 
organizational capabilities, making Software the best fit.
```

---

## Common Categorization Patterns

### Posts About Agile/Scrum
- **Engineering** if focused on team practices, ceremonies, or how to do Scrum
- **Leadership** if focused on organizational transformation or change management
- **Software** if focused on business value or organizational design

### Posts About Teams
- **Leadership** if focused on team dynamics, culture, or people management
- **Engineering** if focused on engineering team practices or technical collaboration
- **Software** if focused on team structure as it relates to software architecture

### Posts About AI/Technology
- **Software** if focused on business adoption or strategic implications
- **Engineering** if focused on how to use AI tools in development workflow
- **Leadership** if focused on leading through technology change

### Posts About Testing
- **Engineering** if focused on testing practices, techniques, or quality assurance
- **Software** if focused on testing as a business risk management strategy
- **Leadership** if focused on building a quality culture

### Posts About Architecture
- **Engineering** if focused on technical design patterns or implementation
- **Software** if focused on architecture as organizational design or business capability
- **Leadership** if focused on decision-making processes or organizational implications

---

## Tips for Better Category Selection

### Do:
- ✅ Focus on the **primary audience** and main takeaway
- ✅ Consider the **lens** through which the content is presented
- ✅ Think about what **domain** the solution lives in
- ✅ Choose based on the **core value** the post provides

### Don't:
- ❌ Choose based on topics mentioned rather than primary focus
- ❌ Let tags override the main category decision
- ❌ Overthink borderline cases - pick the best fit and move on
- ❌ Create new categories - stick to the approved three

---

## Notes

- This prompt was created on 2026-01-12
- Based on analysis of 84 blog posts since 2023
- Categories align with blog focus: Software, Engineering, and Leadership
- Each post should have exactly ONE category
- See `CATEGORIES.md` for complete category definitions and guidelines
