import validatorTypes from "@data-driven-forms/react-form-renderer/dist/cjs/validator-types";

const schema = {
  title: "Digital Public Goods Submission",
  description: `This is a BETA version of our submission form and process which means we'll be learning from it and may contact you for follow-up information and input on the process as well as your project submission.`,
  fields: [
    {
      component: "wizard",
      name: "wizard",
      fields: [
        {
          title: "Get started with submission wizard form",
          name: "step-1",
          nextStep: "step-2",
          fields: [
            {
              name: "name",
              component: "text-field",
              label: "Project name",
              helperText: "For example, Wikipedia.",
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "description",
              component: "text-field",
              label: "Project Description",
              helperText:
                "Include a concise 1-line description for this project.",
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "website",
              component: "text-field",
              label: "Project Website URL",
              helperText: "Public website (string must include http(s)://)",
              validate: [
                {
                  type: "required",
                },
                {
                  type: validatorTypes.URL,
                },
              ],
            },
            {
              name: "type",
              component: "checkbox",
              label: "What category best describes this project?",
              helperText: "Select all that apply.",
              options: [
                {
                  label: "Open Source Software",
                  value: "software",
                },
                {
                  label: "Open Data",
                  value: "data",
                },
                {
                  label: "Open Content",
                  value: "content",
                },
                {
                  label: "Open Artificial Intelligence (AI) Model",
                  value: "model",
                },
                {
                  label: "Open Standard",
                  value: "standard",
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "repositoryURL",
              component: "text-field",
              label: "Link to Github (or other) repository",
              helperText:
                "Required for open source software - link to public repository",
              condition: {
                when: "type",
                pattern: /software/,
              },
              validate: [
                {
                  type: "required",
                },
                {
                  type: validatorTypes.URL,
                },
              ],
              classes: { root: "conditional" },
            },
            {
              name: "SDGs",
              component: "checkbox",
              label:
                "Please identify which of the Sustainable Development Goals this project is relevant to",
              helperText: "Select all that apply.",
              options: [
                {
                  label: "1: End Poverty in all its forms everywhere",
                  value: 1,
                },
                {
                  label: "2: Zero Hunger",
                  value: 2,
                },
                {
                  label: "3: Good Health and Well-Being",
                  value: 3,
                },
                {
                  label: "4: Quality Education",
                  value: 4,
                },
                {
                  label: "5: Gender Equity",
                  value: 5,
                },
                {
                  label: "6: Clean Water and Sanitation",
                  value: 6,
                },
                {
                  label: "7: Affordable and Clean Energy",
                  value: 7,
                },
                {
                  label: "8: Decent Work and Economic Growth",
                  value: 8,
                },
                {
                  label: "9: Industry, Innovation and Infrastructure",
                  value: 9,
                },
                {
                  label: "10: Reduced Inequalities",
                  value: 10,
                },
                {
                  label: "11: Sustainable Cities and Communities",
                  value: 11,
                },
                {
                  label: "12: Responsible Consumption and Production",
                  value: 12,
                },
                {
                  label: "13: Climate Action",
                  value: 13,
                },
                {
                  label: "14: Life Below Water",
                  value: 14,
                },
                {
                  label: "15: Life on Land",
                  value: 15,
                },
                {
                  label: "16: Peace, Justice and Strong Institutions",
                  value: 16,
                },
                {
                  label: "17: Partnerships for the Goals",
                  value: 17,
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "organizations",
              component: "sub-form",
              description:
                "Provide the primary organization or maintainer of this project i.e. Wikipedia",
              classes: { root: "NoBottomMargin" },
              fields: [
                {
                  name: "organizations[org_type]",
                  component: "text-field",
                  initialValue: "owner",
                  hideField: true,
                  validate: [
                    {
                      type: "required",
                    },
                  ],
                },
                {
                  name: "organizations[name]",
                  component: "text-field",
                  label: "Name of the organization",
                  validate: [
                    {
                      type: "required",
                    },
                  ],
                },
                {
                  name: "organizations[website]",
                  component: "text-field",
                  label: "Website of the organization",
                  validate: [
                    {
                      type: "required",
                    },
                    {
                      type: validatorTypes.URL,
                    },
                  ],
                },
                {
                  name: "organizations[contact_name]",
                  component: "text-field",
                  label: "Contact name",
                },
                {
                  name: "contact_email",
                  component: "text-field",
                  label: "Contact email",
                },
              ],
            },
          ],
        },
        {
          title: "DPG Candidates",
          name: "step-2",
          fields: [
            {
              component: "select",
              name: "license[spdx]",
              label: "Choose License",
              description:
                "DPGs must use an open license. Please identify which of these approved open licenses this project uses: *. For Open Source Software, we only accept OSI approved licenses. For Open Content we require the use of a Creative Commons license while we encourage projects to use a license which allows for both derivatives and commercial reuse or dedicate content to the public domain (CC0) we also accept licenses which do not allow for commercial reuse: CC-BY-NC and CC-BY-NC-SA. For data we require a Open Data Commons approved license listed at opendefinition.org/licenses/. IF YOU USE A LICENSE THAT IS NOT CURRENTLY LISTED HERE BUT YOU BELIEVE SHOULD BE INCLUDED PLEASE EMAIL nominations@digitalpublicgoods.net",
              validate: [
                {
                  type: "required",
                },
              ],
              simpleValue: true,
              options: [
                {
                  label: "0BSD:0-clause BSD License",
                  value: "0BSD",
                },
                {
                  label: "AAL:Attribution Assurance License",
                  value: "AAL",
                },
                {
                  label: "AFL-3.0:Academic Free License 3.0",
                  value: "AFL-3.0",
                },
              ],
            },
            {
              name: "license[licenseURL]",
              component: "text-field",
              label: "License URL",
              description:
                "Please link to where the license is indicated for this project: * I.e. GitHub Repo or page of website.",
              validate: [
                {
                  type: "required",
                },
                {
                  type: validatorTypes.URL,
                },
              ],
            },
            {
              component: "radio",
              label:
                "Is the ownership of the project and everything that the project produces clearly defined and documented? *",
              description:
                "i.e. This can be through copyright, trademark, or other publicly available information.",
              name: "clearOwnership[isOwnershipExplicit]",
              options: [
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "clearOwnership[copyrightURL]",
              component: "text-field",
              label: "Link to ownership documentation",
              helperText:
                "If yes - please link to the relevant copyright, trademarks, or ownership documentation for the project.",
              condition: {
                when: "clearOwnership[isOwnershipExplicit]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
                {
                  type: validatorTypes.URL,
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              label:
                "Does this open project have mandatory dependencies (i.e. libraries, hardware) that create more restrictions than the original license? *",
              name: "platformIndependence[mandatoryDepsCreateMoreRestrictions]",
              options: [
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "platformIndependence[isSoftwarePltIndependent]",
              component: "radio",
              label:
                "If yes - are the open source components able to demonstrate independence from the closed component and/or are there functional, open alternatives?",
              options: [
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ],
              condition: {
                when:
                  "platformIndependence[mandatoryDepsCreateMoreRestrictions]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              name: "platformIndependence[pltIndependenceDesc]",
              component: "text-field",
              label: "Platform independence description",
              description:
                "If yes - please describe how the open source components are independent and/or list the open alternatives for the closed component:",
              condition: {
                when: "platformIndependence[isSoftwarePltIndependent]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              component: "radio",
              name: "documentation[isDocumentationAvailable]",
              label:
                "Does some documentation exist of the source code, use cases, and/or functional requirements for this project? *",
              description:
                "For content, this should indicate any relevant compatible apps, software, hardware required to access the content and any instructions about how to use it. For software projects, this should be present as technical documentation that would allow a technical person unfamiliar with the project to launch and run the software. For data projects, this should be present as documentation that describes all the fields in the set, and provides context on how the data was collected and how it should be interpreted.",
              options: [
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "documentation[documentationURL]",
              component: "text-field",
              label: "If yes - please link to the relevant documentation:",
              helperText: "",
              condition: {
                when: "documentation[isDocumentationAvailable]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
                {
                  type: validatorTypes.URL,
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "NonPII[collectsNonPII]",
              label:
                "Does this project collect or use non-personally identifiable information (non-PII) data? *",
              options: [
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "NonPII[checkNonPIIAccessMechanism]",
              component: "radio",
              label:
                "If yes - is there a mechanism for extracting or importing non-PII information from the system in a non-proprietary format? *",
              options: [
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ],
              condition: {
                when: "NonPII[collectsNonPII]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              name: "NonPII[nonPIIAccessMechanism]",
              component: "text-field",
              label: "Mechanism extraction description",
              helperText:
                "If yes - Describe the mechanism for extracting or importing non personally (non-PII) identifiable information from the system in a non-proprietary format:",
              condition: {
                when: "NonPII[checkNonPIIAccessMechanism]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              classes: { root: "conditional" },
            },
          ],
        },
      ],
    },
  ],
};

// Dynamically add a subform for each SDG that only display conditionally if the
// corresponding SDG checkbox is checked. Validation for these fields is coded in React, not here.
for (let i = 1; i <= 17; i++) {
  // Insert these fields right after the SDGs so that they get displayed immediately below
  const SDGindex = schema.fields[0].fields[0].fields.findIndex(
    (e) => e.name == "SDGs"
  );
  schema.fields[0].fields[0].fields.splice(SDGindex + i, 0, {
    name: "subform" + i,
    component: "sub-form",
    description:
      "Please supply information or link to support relevance to SDG " +
      i +
      ":",
    condition: {
      when: "SDGs",
      pattern: new RegExp("\\b" + i + "\\b"),
    },
    classes: { root: "conditional" },
    fields: [
      {
        name: "evidenceText" + i,
        component: "text-field",
        label: "Description:",
      },
      {
        name: "evidenceURL" + i,
        component: "text-field",
        label: "URL:",
        validate: [
          {
            type: validatorTypes.URL,
          },
        ],
      },
    ],
  });
}

export default schema;
