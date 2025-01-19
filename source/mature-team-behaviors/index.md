---
title: Mature Agile Team Behaviors
comments: false
date: 2025-01-21 9:30:00
version: 1.1.0
---

> version 1.1.0 - Posted 20250121
> - Sequence of Headings grouped and aligned to better flow.  
> - Recommended Behaviors for Work Disruptions added under 'Each Sprint'

**DISCLAIMER**: This document is still under development. It represents the experience and opinions of myself and the contributors of this document. It is NOT a hard-and-fast rule, but rather a distilled guide from experience. Use it wisely.

***Acknowledgement***: I first encountered the idea of Behavioral Markers, applied to Agile Teams, in a talk by [Daniel Walsh](https://www.linkedin.com/in/danwalsh1115/), at Keep Austin Agile 2024. Credit to him for inspiring this application. 

This document outlines ‘Behavioral Markers’ of a Mature, High-Performing Agile Team in Software Development. A good [behavioral marker](https://www.notss.org/behavioural-marker) is a specific, observable, non-technical pattern of behavior either by or between individuals on a team that is causally linked with Team Performance. The listed behaviors in this document are an attempt to articulate the patterns of behavior and characteristics observed in [high-performance teams](https://en.wikipedia.org/wiki/High-performance_teams#Definition). This document should serve as something like a guideline or questionnaire to evaluate the maturity of one’s own team. It is important to note that a team might not exhibit all of these behaviors and still be effective. This list should evolve as the organization’s understanding of a mature team develops.

## How to Use

This document can be treated like an Open Assessment for your team. A regular check against your team’s behaviors can help identify growth over time and current growth opportunities. You could also use a subset of these lists to help provide examples of ‘good’ to a newly formed team. However such a team should not expect to instantly exhibit these behavioral markers.

Most of these behaviors are intended to measure a discrete event. However the same criteria could be cast into a on-going evaluation to check for the consistency of practice in these behaviors.

## Backlog Management

### Backlog Refinement (Event)

- Story discussed by Individual Contributors
    - Minimum: Sr. Contributor can start discussion
    - Best: Junior Member guide the conversation with their questions
- Participation is reasonably distributed, no one dominant voice.
- PO attends Refinement.
- Stories are NOT created independent of Business need
    - SPIKEs, and Enablers should connect to a definite upcoming need!
- Refinements happen consistently and intentionally
    - Starts on time
    - End on time, or early by consensus of the team
    - Refinements happen more frequently when Backlog is shallow (less than 3 sprints of Ready work.)
    - Team does NOT refine more than 4 sprints in advance of current delivery
    - Every team member knows when the next refinement is.
- Team captures new stories with sufficient information to be 90-Day proof
    - if you read this again in 90 days, you'd know enough to start refining it again.
- Individual Contributors capture Test cases into the Story
    - Test Cases are captured as part of Acceptance Criteria
    - Refinement should NOT capture ALL test cases for a story.
    - Focus on Happy Path, nearby Edge Cases, and relevant business paths.
    - *"Test what matters!"*
- Solution ideas captured in the Technical Notes
    - But solutioning discussions kept short
        - If technical options must be explored before estimation is realistic, the Team schedules time outside of engaging with PO in refinement to gather this information, before the next refinement.
    - Solutioning discussions should capture details sufficient to provide scope-estimation (both Tech and Business side)
- Team discusses non-functional impact of new Stories
    - e.g. Role Access, user flow, maintainability?
- Team Individual Contributors own solutioning process
    - Acceptable: Manager may guides solution, often thru questions, perhaps breaking ties
    - Better: Senior Contributors voluntarily take up design responsibility in the solutioning process.
    - Manager does not DIRECT solution
- Large(Sprint+ or close to 1 Sprint in Size) Stories broken down into multiple Sprint-sized Stories
    - Teams leverage Test Cases to identify suitable fracture boundaries for story splitting
    - Each split story continues to meet Agile story definition (See [INVEST Criteria](https://www.agilealliance.org/glossary/invest/))
- For Stories Marked Ready:
    - Stories meet Department’s Definition of Ready and Team’s extension on top of it.
    - 'Before-After' summary of ticket provided by team member likely to work the ticket
- Team builds and uses their own their own guiding questions to make their Refinements more consistent and effective
    - For Example:
        - Who is the _customer_ of this {Epic|Feature|Story}?
        - Who are the stakeholders of {Epic|Feature|Story}?
        - When this {Epic|Feature|Story} is completed, what _value_ will the _customer_ receive?
        - Where(system) will this _value_ be _delivered_?
        - Can this {Story|Feature} deliver value with only PART of it’s scope?
        - How will I {know|test} that _value_ has been delivered?
        - Do we depend on someone outside of this team to deliver this value?

### Stories
- TBD

### Bugs
- {Still WIP}
- Reproduction Steps are provided
    - Screenshots or other supporting media are valuable
- Ticket describes observed behavior, and expected behavior
- Upon completion, updated or new Test Cases added to TCM to cover this case in the future
    - Ideally, these Test Cases are covered by new automation so that regression is proofed without additional manual work.
- Bugs resulting from Remedy Tickets link back to the source ticket
- Ticket is triaged with appropriate stakeholders before being worked
- Team has established Operational SLAs
    - SLAs stipulate the nature of ‘bugs’ which the team will interrupt committed work for.

## Each Sprint
- {Still WIP}
- Team planned their sprint, see Sprint Planning
- In-progress Story Scope is protected
    - Additional Scope ONLY added to In-progress Stories by agreement among the Developer and PO
        - Modified but Committed Stories continue to complete within the Sprint boundary.
- Committed Stories complete before End of Sprint (80-90% of the Time)
    - If Team completes ALL committed Stories, consistently every sprint, the team is Under-planning, and should attempt to stretch in future sprints.
- Team maintains a sufficient backlog for smooth flow, see Backlog Refinement
    - Typically this is 2-3 Sprints worth of refined, ready work.
- Team Members 'finishing early' jump on to incomplete committed stories before pulling in new work
    - This explicitly includes In-progress stories of another Team Member, i.e. Swarming.
- Team takes time to maintain their solution (e.g. dependency updates, configuration adjustments, refactoring)
- Team members allocate time to grow their skills (e.g. training, practice, research etc.)
- Team gathers feedback on completed work from stakeholders (usually in the form of a Sprint Demo)

### During Work Disruptions
- For Every kind of Disruption:
		1. Finish WIP as much as you can (Flow Like Water), BEFORE diverting to any other Behavior ;  see also [Effectively Onboarding as a Junior Dev](./2022/02/16/onboarding-junior-engineer/)
		2. Do NOT pick up NEW WIP!
		3. Review Disruption SOP (e.g. this list or similar)
		4. Start Monitoring Disruption Duration
- Activities by Disruption Duration (progress thru the List as Timer runs)
	- 0 - 15m - _Don't Lose Task Working-Memory_
		- Get up and Stretch
		- Clean your physical Workspace desk
		- Document your work (Comments, Documentation, Instrumentation)
	- 15 - 30m - _Stay within Task Zone, but expect Resumption Tax_
		- Add some Tests [Given-When-Then](https://en.wikipedia.org/wiki/Given-When-Then) or similar post on testing. 
		- Review/Capture SOP (Your Supported Technologies, Team Working Agreement, Project Charter, [Ramp-up Dossier](https://youtube.com/shorts/nlRNc2YbwR4) etc.)
		- Install/Check for Dependency updates
	- 30 - 90m - _Resumption Tax unavoidable, can work further afield._
		- Inform Team/Leader of disruption, 
		- Defer to Leader's decision next actions (Swarm, Pivot, or Other)
		- Absent instruction:
			- Refactor per best practices, Upgrade core dependencies
			- Review Sprint Goal, and Action Items for this Sprint
			- Process/Self Improvement (Training, read a book, run an experiment)
	- Significant Disruption (e.g. 90m +) - _Work is stalled, prepare to swarm, or pivot_
		- Escalate Issue, start making noise, and get instruction/help from Ladders
		- Begin Swarming the problem with your Team if in your area
		- Or Pivot,per your Leader, to next-highest-value improvement

### Sprint Planning
- Sprint Goal is created based on the Value the Team wishes to capture for end Users this sprint
    - NOT a statement of 'will complete these committed tickets'
    - For best results, Product Owner provides an initial draft goal, based on Product Strategy and User Needs. The Team refines this to reflect the achievable increment of that value within the sprint.
- Team Capacity for the Sprint discussed (vacations, training, freezes etc.)
    - Commitments adjusted based on availability.
    - Commitments adjusted based on team's Velocity (average of last 3 completed sprints delivery)
    - Only Present Team members may commit to Sprint Backlog.
    - No one commits on behalf of absent Team Members.
    - ALL present Members have appropriately committed to TEAM sprint backlog.
    - Individuals do NOT commit to individual Tickets, though they may volunteer to head them.
- OMS (Operations, Maintenance, and Support) Reserves are discussed and allocated for the sprint
    - Rule of Thumb is ~20% for OMS every sprint.
    - OMS Tickets meet DoR, and taken intentionally
    - Capacity reserved to handle break-in work from Bugs, based on team's previous bugs
- Only Tickets in READY state are reviewed
    - Or else, Tickets are first made Ready before being Committed
        - When necessary, DoR is reviewed.
    - If previous Sprint Planning ALSO had to do Refinement, Scrum Master raises issue.
        - Team addresses issue with additional Refinements during the affected Sprint.
- For Each ticket:
    - Test cases, and Expectations are reviewed
    - Last minute edge-cases discussed and added
    - Loose solution ideas reviewed
    - Before Ticket is Committed, 'Before-After' summary of ticket provided by team member likely to work the ticket

### Daily Scrum
- Facilitation
    - Daily Scrum starts and ends on time. (15min duration)
    - Daily Scrum is lead by Developers, rather than by the Scrum Master or Manager.
    - Developers talk to each other during Daily Scrum, rather than Status Updating the Scrum Master or Manager.
        - Recommendation: Review the tickets starting with those nearest to completion, and proceed backwards. This helps drive focus towards finishing committed work.
- Content
    - Individual Contributors maintain focus of the meeting on Work Accomplished, Next Accomplishments, and Soliciting Help with Blockers
    - Individual updates are specific, and succinct.
        - e.g. Accomplishments discussed in terms of AC/Test Cases of the affected Ticket
    - Support Incident Queue is publicly reviewed
        - When necessary, urgent tickets enter Sprint Backlog to be worked ASAP
    - Team proactively monitors Application Logging
        - Either reviewing overnight logs in Daily Scrum, or bringing potential incidents to the meeting for discussion.
    - Relevant Action Items from previous Retro are reviewed, and Discussed.
- Patterns
    - Team does NOT dive into solutioning during the Daily Scrum, but sets up time after for this.
    - Tickets statuses are NOT updated during the meeting
        - Ticket Statuses are correct BEFORE Daily Scrum starts
    - Blocked Tickets publicly discussed every day until resolved
        - What is holding this back?
        - Who can help us move it?
        - Will this impact sprint goal?
    - Scrum Master voluntarily offers ways they can help unblock team when challenges outside the team arise.
    - Scrum Master prompts team to identify action they can take to prevent blockers when risks are brought up in DSU
        - Scrum Master may offer ways to prevent blockers, if team struggles to identify options.



### Sprint Review/Demo
- {Still WIP}
- Only Completed Stories are 'demonstrated'
    - Team does NOT demonstrate incomplete or undelivered work.
- Team demonstrated delivered product as the User would receive it
    - Not by Powerpoint, or thru IDE Debug!
        - Exceptions can be made for Security Reasons or for Long Running or Infrequence Processes
    - Use of a Test System is acceptable, when Production Data cannot be shared in Demo.
- Review/Demo attended by Business Stakeholders
- PO should discuss Completed Work, and Planned Future Work for the following Sprint with Stakeholders
- Product Performance Metrics, such as DAU, or Net New User etc. shared and discussed as relevant
    - e.g. If an increase of New Users changed feature priorities, this should be discussed.
- Business Stakeholders converse with the Team on newly delivered product, existing product, or desired future product
    - Team engaged with Business in genuine curiosity, NOT in 'defense of their work'
    - Team actively solicits Stakeholder Feedback, if it is not provided unprompted.
        - Team may develop specific questions they seek answers to to aide in this conversation.

### Sprint Retrospective
- Timing
    - Sprint Retrospective takes place _after_ Sprint Review, and _before_ Sprint Planning
    - Retrospective is regularly scheduled, on the sprint cadence
    - Retrospectives is scheduled for sufficient time to explore the challenges the team is facing.
        - Maximum of 3 hours for a 1 month sprint, per the [Scrum Guide](https://scrumguides.org/scrum-guide.html#sprint-retrospective)
        - 30 minutes is considered too short.
- Behaviors
    - Team Members actively, individually engage in Retro discussions
    - Team does NOT blame each other for failures
    - Team Members speak up to accept responsibility for short-comings
    - Individuals actively solicit help from their team mates for challenges the individual is facing.
    - Team members actively listen to one another
        - Team members seldom interrupt or speak-over one another
        - When interruptions occur, interrupter apologies and returns the floor to the original speaker.
    - Scrum Master helps facilitate Retrospection through occasional, intentional variation of format and/or prompts for reflection.
    - Team can determine whether an impediment is addressable within the Team or not.
    - All Attendees on Camera
- Topic
    - Team Processes, and Interactions Discussed
    - Previous Sprint Delivery is evaluated
        - Sprint Delivery is measured against objective metrics
        - Sprint Delivery is discussed in context to past delivery, and objective metrics.
    - Empirical information shared with group for decision making
    - Previous Action Items and their outcomes are reviewed, and discussed
        - Attention called out when Previous Action Items were ignored or not acted on.
    - Impediments discussed, and ,if addressable by team, actions proposed.
        - If NOT addressable, Scrum Master and Team lead escalate as appropriate.
- Team Members including SDET, Team Lead, Scrum Master, and optionally Product Owner are ONLY attendees at Retro
    - High-level Leaders do NOT attend, and no recordings are provided. (Or asked for.)
- New Action Items Created in Retro
    - Action Items have Specific targets, time-boundaries, and owners