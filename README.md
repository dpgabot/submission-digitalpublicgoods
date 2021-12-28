[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

# Digital Public Goods Submission Form

## Overview

This webapp is built using [Next.js](https://nextjs.org/) as a React Framework and deployed using [Vercel](https://vercel.com/).

The forms are [Data Driven Forms](https://data-driven-forms.org/), configured through this JSON schema: [schema.js](schemas/schema.js).

## Design Requirements

- [x] Support for standard HTML Field Types: Drop downs, Multiple choice, Short answer/long answer
- [x] Descriptive paragraphs (helperText)
- [x] Field validation
- [x] Required fields
- [x] Questions being hidden and presenting themselves based on previous questions i.e. If you select SDG 4
- [x] Sections
- [x] Logic (skip questions/go to question based on response)
- [x] Autosaving
- [x] Collect emails
- [ ] Login (authenticate / user management)
- [ ] Progress indicator
- [ ] Save and come back to continue editing
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
NEXT_PUBLIC_GITHUB_OWNER=lacabra
NEXT_PUBLIC_GITHUB_REPO=submission-digitalpublicgoods
GITHUB_BRANCH=main
GITHUB_ASSIGNEES="comma-separated list of users"
NEXT_PUBLIC_GOOGLE_SPREADSHEET_SCRIPT_URL={GOOGLE_SPREADSHEET_SCRIPT_URL}
MY_AWS_ACCESS_KEY_ID={YOUR_AWS_ACCESS_KEY_ID}
MY_AWS_SECRET_ACCESS_KEY={YOUR_AWS_SECRET_ACCESS_KEY}
```

## :memo: License

This software is licensed under the [Apache License 2.0](LICENSE):

```
   Copyright 2021 UNICEF

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

The two main dependencies (and their respective licenses) this software depends on are:

- [Next.js](https://nextjs.org/) licensed under the MIT License
- [Data Driven Forms](https://data-driven-forms.org/) licensed under the Apache License 2.0
