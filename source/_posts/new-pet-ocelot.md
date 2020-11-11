---
title: Looking for a new pet? Try an Ocelot!
categories:
  - Software Development
  - Architecture
tags:
  - ocelot
  - api-gateway
  - patterns
  - proof-of-concept
  - architecture
date: 2020-11-11 09:00:00
photos:
  - img/post_img/ocelot_logo.png
---

Do your external applications need to reach through your companies [DMZ](<https://en.wikipedia.org/wiki/DMZ_(computing)>) to reach an internal API? Have you been writing thin [proxies](https://en.wikipedia.org/wiki/Proxy_pattern) to all the external Apps access? Ever wish you had an easier way to expose that new internal endpoint without having to write more proxy code? What about saving on the pain of duplication to expose that same endpoint to 2 different external apps? This was the situation my client was facing just recently. And as the architecture board discussed exposing the same set of endpoints to yet another external app, I kept thinking there had to be a better way. I did a quick internet search, and found the name of the pattern I was thinking of: [API Gateway](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/direct-client-to-microservice-communication-versus-the-api-gateway-pattern).

For context, an API Gateway serves as a middle layer between the front-end and any number of back-ends. Naturally there are a number of benefits and drawbacks. You can implement a number of cross-cutting concerns at this layer, and maybe even caching. Technically you gain some [security through obscurity](https://en.wikipedia.org/wiki/Security_through_obscurity#Obscurity_in_architecture_vs._technique), and an additional layer to your onion but there are better ways to get security. Some Gateways allow you to validate identity or JWT tokens through custom middleware for example. More importantly though, by using the Gateway, you begin to separate the dependency of the Front-end on any series of backends it uses. That said, you do run the risk of adding a [Single point of failure](https://en.wikipedia.org/wiki/Single_point_of_failure) to your network if you don't load-balance across a couple instances of the Gateway.

When I brought up this concept to the board, I was immediately tasked with providing a Proof of Concept, with a couple stipulations. It had to be straight-forward, and where possible they wanted it to be On-Premises. So even though the Azure Gateway was a viable option, it was not the preferred solution. These conditions , plus our shops preferred tech stack, .Net, lead me to Ocelot. Ocelot is even [Microsoft's go-to API Gateway](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/implement-api-gateways-with-ocelot) for 'just-getting-started' situations. [Ocelot's documentation](https://ocelot.readthedocs.io/en/latest/introduction/gettingstarted.html) in particular inspired confidence for a new-comer to this domain of architecture. Set-up was incredibly simple as well. Since Ocelot is a nuget package, most of the work is just in getting the routes configured.

Once you have Ocelot setup in your Program's Start-up phase, you'll need to tell Ocelot how you want it to direct traffic. Ocelot's routes are configured through a JSON file. You also tell Ocelot what domain it should pretend to be here. In the routes you will specify how Ocelot will translate the Requests it will receive and those it will send. For example, suppose you issue this request:
`GET 'https://ocelotGW.yoursite.com/todos' `

If that route's function is supported by your internalToDoApi at the my-todos endpoint, you'd tell Ocelot to take that upstream url: '/todos' and route it to the down stream host 'internalToDoApi.yoursite.com' at the downstream path '/my-todos'. Here's what that would look like:

```json
{
  "UpstreamHttpMethod": ["Get"],
  "UpstreamPathTemplate": "/todos",
  "DownstreamScheme": "https",
  "DownstreamHostAndPorts": [
    {
      "Host": "internalToDoApi.yoursite.com"
    }
  ],
  "DownstreamPathTemplate": "/my-todos"
}
```

Naturally, since you can have one Ocelot point to multiple different hosts this opens up a number of options, especially in a Microservices environment, and even for environments with multiple front-ends. Take a Mobile App and Website front-end. Naturally these two fronts might require similar data from the back... but in the Mobile scenario the paging might be different, or it might rely more heavily on caching. More-over, the Website might offer far more functionality than the Mobile app. If we simply left our entire microservice environment open to both apps, the maintenance would be a pain. And development on each app would require knowledge of each micro-service and how you'd need to configure your request to that service could support your particular needs. Why not hand that duty off to the Gateway? It's already there to help you consolidate the numerous disparate routes? And nobody said you could only have 1, right?

As it turns out this is actually a suggested pattern when implementing API Gateways. And it is called ['Backends-for-Frontends'](https://microservices.io/patterns/apigateway.html). It's basically what it sounds like. You use the Gateway to present a customized 'Backend' for each Frontend you need to support, thus encapsulating or separating your Microservice architecture from your frontend's configuration. And to support this with Ocelot, all you'd really need would be slightly different configuration JSONs! In practice you could easily host a single customized code base for your ocelot with all your different configuration file, and then, at the deployment time, change which json you use. Then Ta-Da, you have a new BFF.

So after rigging up a custom gateway some sample routes, and even a simple demo middleware, the board moved to accept Ocelot Api Gateways as an accepted pattern for Exposing Internal APIs safely through the DMZ a la proxy. For my part, this experience has me quite excited. I got to see [Dependency-Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle) applied at a meta-level across the companies application fabric! Further, the ease of configuration of Ocelot has me thinking about Dockerizing it. I've played in that department for a while, so I think I'll pause on that project for the moment. Nonetheless, I enjoyed my time with Ocelot and am eager to see it's application in the future. Hopefully this little tour has encouraged you to give it a try too!
