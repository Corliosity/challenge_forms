# Relex User Experience Study : Avis

## Andrew Corliss

#### Issues
- Header and Footer do not match rest of site
--  These give trust to a user that they are in the right place
-- It is asethtic but provides better usability as it builds good will
- Country Input
-  Asks for country but then requires specific location
- Grey fields Optional?
-- It is tough to tell what 'grey' fields are when the form background is grey
-- Users can have trouble with color - 'What grey are they talking about?'
-- Mark optional fields for users instead of required.  Makes the form easier to read.
- Omni-search for Car rental location
-- Taking a user to another screen is a distraction
- Tool tips are overused
-- If the wording of the label is too vague update first (country of rental should not require a tooltip)
- Date fields should be in a single input
-- Keep a user on the keys without making them think to much
-- Most users are accustomed to a single date input (DD/MM/YYYY)
- Bottom messaging: Country specific, only show when country (at top) is selected.
-- Provide meaningful information to user
-- If you always show it will be ignored, then cases can occur when user needs it and will ignore it.
- Omit needless words in error message ((GB-GB-E0003) - has no meaning to user)
- (Sorry, the Avis rental office is closed on s. Please change the date or choose a different Avis rental office. (GB-GB-E0012))
-- on 's' (should be date selected) - if offices closed on certain date provide opening times
- Give breadcrumbs (User location) in Form
-- Users should not need instructions, let a page name or section name tell them the information that is required

#### Recomendations
- Add Header and Footer to all form screens
- Let Country Selection *mean* Selecting a country then ask for State information.
-- It is an extra field but helps in the long term by not frustrating or making a user think more
-- Option 2 would be to follow a Kayak model and let user search for rental locations (like searching for airports)
- Do not reload on country, prevents users from continuing at their pace.
- Return helpful Error Messages
-- Drop needless words from text and make them more readable "Please select a rental/return location"
-- "Offices are closed Saturdays and Sundays"
- Make single inputs as often as possible
-- Specify a date format and drop the other two boxes
- Mark fields with text "optional" - better than defining a color that no one may see
-- Drop the red asterik on required fields, since implicitly "optionals" are marked the remainder are required
- Show timely messaging
-- If a message does not apply to user, then do not show it and clutter their process
- Drop tooltips where clear message is available
-- Use tooltips when a user will need clarification, other wise their importance to a user drops
- Make it easy to find information in Terms
-- Where is damages located?
- Why link to Terms and Conditions twice on same page?
-- Make call one is for pre-payment, one is regular
-- Give user link direct to timely important information!
- Flight Number - only required if an airport selected. (You can store that information!)
- Labels should be consistent
-- If number is spelled once, it should be spelled everywhere 'Flight Number' 'Credit Card Number'
-- consistency builds trust with user
-- Do not make them think