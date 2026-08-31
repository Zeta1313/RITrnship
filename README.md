# Rochester Institute of Technology Virtual Assistant

> A virtual assistant designed to aid neurodivergent students pursuing PhDs in managing their workflows.

## Overview

This assistant interfaces directly with Google Calendar, sorting the user's current tasks and suggesting what should be accomplished at any given moment. The assistant is designed to interface with Microsoft Copilot, allowing users to access its functionality through natural-language prompts.

### Features

- **Feature One** — The assistant accepts a Google login and scans the calendars associated with the account, sorting scheduled tasks and presenting them in order of priority with fully transparent logic.
- **Feature Two** — The prompt used to sort the user's calendars is fully customizable, allowing users to tailor their experience to the complicated and unique demands of pursuing a PhD. Agent-side code helps prevent malicious interference with the assistant's instructions.
- **Feature Three** — When fully integrated with Microsoft Copilot, the assistant will no longer require the user to open the application to access its features. Instead, users will be able to invoke the assistant directly through Microsoft Copilot. **This feature is under development**
---
<h4>Ongoing Development</h4>
<sub>
This assistant is under active development. Due to constraints, the Microsoft Copilot side of the program was unable to be tested. As a result, code responsible for communicating with the LLM may not currently function as intended.

Additionally, for **Feature Three** to function properly, the authentication system will require extensive work. Authentication and communication with Google Calendar currently function only while the application is open, meaning attempts to communicate with the assistant through Copilot will currently fail. A complete overhaul of the authentication system is needed to securely persist the user's login state and allow authentication credentials to be refreshed when the user invokes the assistant. Permanently storing an authentication key would introduce a significant security weakness.
</sub>
