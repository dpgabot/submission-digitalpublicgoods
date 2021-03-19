# Digital Public Goods Submission Form 

## Overview

This webapp is built using [Next.js](https://nextjs.org/) as a React Framework and deployed using [Vercel](https://vercel.com/). 

The forms are [Data Driven Forms](https://data-driven-forms.org/), configured through this JSON schema: [schema.json](schemas/schema.json).

## Design Requirements

- [X] Support for standard HTML Field Types: Drop downs, Multiple choice, Short answer/long answer 
- [X] Descriptive paragraphs (helperText)
- [X] Field validation
- [X] Required fields
- [X] Questions being hidden and presenting themselves based on previous questions i.e. If you select SDG 4
- [ ] Progress indicator
- [ ] Sections
- [ ] Logic (skip questions/go to question based on response) 
- [ ] Login (authenticate / user management) 
- [ ] Autosaving 
- [ ] Save and come back to continue editing
- [ ] Collect emails 
- [ ] Mailchimp integration: automatic sending of emails based on certain form responses

* Admin Interface:
    - [ ] Admin Interface
    - [ ] Review forms individually
    - [ ] Some data aggregated (summary view) 
    - [ ] Percentage of docs through forms
    - [ ] How many forms were not complete (aborted applications) 

* For Communities of Practice: 
    - [ ] P1. Keyword search through applications (i.e. to find ones related to health, finance, climate)
    - [ ] The ability to export project applications (same as the ability to review forms individually but also to have in a form you can send people) 
    - [ ] P2 - A review tool for CoP members who can vote yes/no on projects? 

## Configuration

Set the following environment variables in a `.env.local` file:
```bash
ACCESS_TOKEN={YOUR_GITHUB_TOKEN_HERE}
GITHUB_OWNER=lacabra
GITHUB_REPO=submission-digitalpublicgoods
GITHUB_BRANCH=main
NEXT_PUBLIC_GOOGLE_SPREADSHEET_SCRIPT_URL={GOOGLE_SPREADSHEET_SCRIPT_URL}
```
