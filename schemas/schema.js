import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";
import { CONDITIONAL_SUBMIT_FLAG } from "@data-driven-forms/common/wizard";
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
          nextStep: {
            when: "stage",
            stepMapper: {
              nominee: CONDITIONAL_SUBMIT_FLAG,
              DPG: "step-2",
            },
          },
          fields: [
            {
              name: "name",
              component: "text-field",
              label: "Project name",
              helperText: "For example: Wikipedia.",
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "aliases",
              component: "text-field",
              label: "Project aliases",
              helperText: "For example: acronymns",
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
              name: "contact[name]",
              component: "text-field",
              label: "Contact name",
              helperText:
                "If there is someone from the project we can contact for more information - please provide their full name",
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "contact[email]",
              component: "text-field",
              label: "Contact email",
              helperText: "Please provide the email of the contact person",
              validate: [
                {
                  type: "required",
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
              component: "field-array",
              name: "license",
              label: "Choose License",

              fieldKey: "field_array",
              title: "Choose License",
              description:
                "DPGs must use an open license. Please identify which of these approved open licenses this project uses: *. For Open Source Software, we only accept OSI approved licenses. For Open Content we require the use of a Creative Commons license while we encourage projects to use a license which allows for both derivatives and commercial reuse or dedicate content to the public domain (CC0) we also accept licenses which do not allow for commercial reuse: CC-BY-NC and CC-BY-NC-SA. For data we require a Open Data Commons approved license listed at opendefinition.org/licenses/. IF YOU USE A LICENSE THAT IS NOT CURRENTLY LISTED HERE BUT YOU BELIEVE SHOULD BE INCLUDED PLEASE EMAIL nominations@digitalpublicgoods.net",
              RemoveButtonGridProps: { xs: 3 },
              FieldGroupGridProps: { xs: 9 },
              fields: [
                {
                  component: "select",
                  name: "spdx",
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
                    {
                      label: "GNU Affero General Public License version 3",
                      value: "AGPL-3.0",
                    },
                    {
                      label: "Apache Software License 1.1",
                      value: "Apache-1.1",
                    },
                    {
                      label: "Apache License 2.0",
                      value: "Apache-2.0",
                    },
                    {
                      label: "Adaptive Public License",
                      value: "APL-1.0",
                    },
                    {
                      label: "Apple Public Source License",
                      value: "APSL-2.0",
                    },
                    {
                      label: "Artistic license 1.0",
                      value: "Artistic-1.0",
                    },
                    {
                      label: "Artistic License 2.0",
                      value: "Artistic-2.0",
                    },
                    {
                      label: "1-clause BSD License",
                      value: "BSD-1-Clause",
                    },
                    {
                      label: "2-clause BSD License",
                      value: "BSD-2-Clause",
                    },
                    {
                      label: "BSD+Patent",
                      value: "BSD-2-Clause-Patent",
                    },
                    {
                      label: "3-clause BSD License",
                      value: "BSD-3-Clause",
                    },
                    {
                      label: "BSD-3-Clause-LBNL",
                      value: "BSD-3-Clause-LBNL",
                    },
                    {
                      label: "Boost Software License",
                      value: "BSL-1.0",
                    },
                    {
                      label: "Cryptographic Autonomy License v.1.0",
                      value: "CAL-1.0",
                    },
                    {
                      label: "Cryptographic Autonomy License v.1.0",
                      value: "CAL-1.0-Combined-Work-Exception",
                    },
                    {
                      label:
                        "Computer Associates Trusted Open Source License 1.1",
                      value: "CATOSL-1.1",
                    },
                    {
                      label: "Creative Commons Attribution 1.0 Generic",
                      value: "CC-BY-1.0",
                    },
                    {
                      label: "Creative Commons Attribution 2.0 Generic",
                      value: "CC-BY-2.0",
                    },
                    {
                      label: "Creative Commons Attribution 2.5 Generic",
                      value: "CC-BY-2.5",
                    },
                    {
                      label: "Creative Commons Attribution 3.0 Unported",
                      value: "CC-BY-3.0",
                    },
                    {
                      label: "Creative Commons Attribution 3.0 Austria",
                      value: "CC-BY-3.0-AT",
                    },
                    {
                      label: "Creative Commons Attribution 3.0 United States",
                      value: "CC-BY-3.0-US",
                    },
                    {
                      label: "Creative Commons Attribution 4.0 International",
                      value: "CC-BY-4.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial 1.0 Generic",
                      value: "CC-BY-NC-1.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial 2.0 Generic",
                      value: "CC-BY-NC-2.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial 2.5 Generic",
                      value: "CC-BY-NC-2.5",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial 3.0 Unported",
                      value: "CC-BY-NC-3.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial 3.0 United States",
                      value: "CC-BY-NC-3.0-US",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial 4.0 International",
                      value: "CC-BY-NC-4.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial Share Alike 1.0 Generic",
                      value: "CC-BY-NC-SA-1.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial Share Alike 2.0 Generic",
                      value: "CC-BY-NC-SA-2.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial Share Alike 2.5 Generic",
                      value: "CC-BY-NC-SA-2.5",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial Share Alike 3.0 Unported",
                      value: "CC-BY-NC-SA-3.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial Share Alike 3.0 United States",
                      value: "CC-BY-NC-SA-3.0-US",
                    },
                    {
                      label:
                        "Creative Commons Attribution Non Commercial Share Alike 4.0 International",
                      value: "CC-BY-NC-SA-4.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 1.0 Generic",
                      value: "CC-BY-SA-1.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 2.0 Generic",
                      value: "CC-BY-SA-2.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 2.5 Generic",
                      value: "CC-BY-SA-2.5",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 3.0 Unported",
                      value: "CC-BY-SA-3.0",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 3.0 Austria",
                      value: "CC-BY-SA-3.0-AT",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 3.0 United States",
                      value: "CC-BY-SA-3.0-US",
                    },
                    {
                      label:
                        "Creative Commons Attribution Share Alike 4.0 International",
                      value: "CC-BY-SA-4.0",
                    },
                    {
                      label: "Creative Commons Zero v1.0 Universal",
                      value: "CC0-1.0",
                    },
                    {
                      label: "Common Development and Distribution License 1.0",
                      value: "CDDL-1.0",
                    },
                    {
                      label: "CeCILL License 2.1",
                      value: "CECILL-2.1",
                    },
                    {
                      label: "CNRI Python license",
                      value: "CNRI-Python",
                    },
                    {
                      label: "Common Public Attribution License 1.0",
                      value: "CPAL-1.0",
                    },
                    {
                      label: "Common Public License 1.0",
                      value: "CPL-1.0",
                    },
                    {
                      label: "Educational Community License, Version 1.0",
                      value: "ECL-1.0",
                    },
                    {
                      label: "Educational Community License, Version 2.0",
                      value: "ECL-2.0",
                    },
                    {
                      label: "Eiffel Forum License V1.0",
                      value: "EFL-1.0",
                    },
                    {
                      label: "Eiffel Forum License V2.0",
                      value: "EFL-2.0",
                    },
                    {
                      label: "Entessa Public License",
                      value: "Entessa",
                    },
                    {
                      label: "Eclipse Public License 1.0",
                      value: "EPL-1.0",
                    },
                    {
                      label: "Eclipse Public License 2.0",
                      value: "EPL-2.0",
                    },
                    {
                      label: "EU DataGrid Software License",
                      value: "EUDatagrid",
                    },
                    {
                      label: "European Union Public License 1.2",
                      value: "EUPL-1.2",
                    },
                    {
                      label: "Fair License",
                      value: "Fair",
                    },
                    {
                      label: "Frameworx License",
                      value: "Frameworx-1.0",
                    },
                    {
                      label: "GNU General Public License version 2",
                      value: "GPL-2.0",
                    },
                    {
                      label: "GNU General Public License version 3",
                      value: "GPL-3.0",
                    },
                    {
                      label: "Historical Permission Notice and Disclaimer",
                      value: "HPND",
                    },
                    {
                      label: "IPA Font License",
                      value: "IPA",
                    },
                    {
                      label: "IBM Public License 1.0",
                      value: "IPL-1.0",
                    },
                    {
                      label: "ISC License",
                      value: "ISC",
                    },
                    {
                      label: "GNU Lesser General Public License version 2.1",
                      value: "LGPL-2.1",
                    },
                    {
                      label: "GNU Lesser General Public License version 3",
                      value: "LGPL-3.0",
                    },
                    {
                      label: "Licence Libre du Québec – Permissive",
                      value: "LiLiQ-P-1.1",
                    },
                    {
                      label: "Licence Libre du Québec – Réciprocité",
                      value: "LiLiQ-R-1.1",
                    },
                    {
                      label: "Licence Libre du Québec – Réciprocité forte",
                      value: "LiLiQ-Rplus-1.1",
                    },
                    {
                      label: "Lucent Public License",
                      value: "LPL-1.0",
                    },
                    {
                      label: "Lucent Public License Version 1.02",
                      value: "LPL-1.02",
                    },
                    {
                      label: "LaTeX Project Public License 1.3c",
                      value: "LPPL-1.3c",
                    },
                    {
                      label: "MirOS Licence",
                      value: "MirOS",
                    },
                    {
                      label: "MIT License",
                      value: "MIT",
                    },
                    {
                      label: "MIT No Attribution License",
                      value: "MIT-0",
                    },
                    {
                      label: "Motosoto License",
                      value: "Motosoto",
                    },
                    {
                      label: "Mozilla Public License 1.0",
                      value: "MPL-1.0",
                    },
                    {
                      label: "Mozilla Public License 1.1",
                      value: "MPL-1.1",
                    },
                    {
                      label: "Mozilla Public License 2.0",
                      value: "MPL-2.0",
                    },
                    {
                      label:
                        "Mozilla Public License 2.0, no copyleft exception",
                      value: "MPL-2.0-no-copyleft-exception",
                    },
                    {
                      label: "Microsoft Public License",
                      value: "MS-PL",
                    },
                    {
                      label: "Microsoft Reciprocal License",
                      value: "MS-RL",
                    },
                    {
                      label: "Mulan Permissive Software License v2",
                      value: "MulanPSL-2.0",
                    },
                    {
                      label: "Multics License",
                      value: "Multics",
                    },
                    {
                      label: "NASA Open Source Agreement 1.3",
                      value: "NASA-1.3",
                    },
                    {
                      label: "Naumen Public License",
                      value: "Naumen",
                    },
                    {
                      label: "University of Illinois/NCSA Open Source License",
                      value: "NCSA",
                    },
                    {
                      label: "Nethack General Public License",
                      value: "NGPL",
                    },
                    {
                      label: "Nokia Open Source License",
                      value: "Nokia",
                    },
                    {
                      label: "Non-Profit Open Software License 3.0",
                      value: "NPOSL-3.0",
                    },
                    {
                      label: "NTP License",
                      value: "NTP",
                    },
                    {
                      label: "OCLC Research Public License 2.0",
                      value: "OCLC-2.0",
                    },
                    {
                      label: "Open Data Commons Open Database License 1.0",
                      value: "ODbL-1.0",
                    },
                    {
                      label: "Open Data Commons Attribution License 1.0",
                      value: "ODC-By-1.0",
                    },
                    {
                      label: "SIL Open Font License 1.1",
                      value: "OFL-1.1",
                    },
                    {
                      label: "SIL Open Font License 1.1",
                      value: "OFL-1.1-no-RFN",
                    },
                    {
                      label: "SIL Open Font License 1.1",
                      value: "OFL-1.1-RFN",
                    },
                    {
                      label: "Open Group Test Suite License",
                      value: "OGTSL",
                    },
                    {
                      label: "OpenLDAP Public License Version 2.8",
                      value: "OLDAP-2.8",
                    },
                    {
                      label: "OSET Public License version 2.1",
                      value: "OSET-PL-2.1",
                    },
                    {
                      label: "Open Software License 1.0",
                      value: "OSL-1.0",
                    },
                    {
                      label: "Open Software License 2.1",
                      value: "OSL-2.1",
                    },
                    {
                      label: "Open Software License 3.0",
                      value: "OSL-3.0",
                    },
                    {
                      label:
                        "Open Data Commons Public Domain Dedication and Licence 1.0",
                      value: "PDDL-1.0",
                    },
                    {
                      label: "PHP License 3.0",
                      value: "PHP-3.0",
                    },
                    {
                      label: "PHP License 3.01",
                      value: "PHP-3.01",
                    },
                    {
                      label: "The PostgreSQL License",
                      value: "PostgreSQL",
                    },
                    {
                      label: "Python License",
                      value: "Python-2.0",
                    },
                    {
                      label: "Q Public License",
                      value: "QPL-1.0",
                    },
                    {
                      label: "Reciprocal Public License, version 1.1",
                      value: "RPL-1.1",
                    },
                    {
                      label: "Reciprocal Public License 1.5",
                      value: "RPL-1.5",
                    },
                    {
                      label: "RealNetworks Public Source License V1.0",
                      value: "RPSL-1.0",
                    },
                    {
                      label: "Ricoh Source Code Public License",
                      value: "RSCPL",
                    },
                    {
                      label: "Simple Public License 2.0",
                      value: "SimPL-2.0",
                    },
                    {
                      label: "Sleepycat License",
                      value: "Sleepycat",
                    },
                    {
                      label: "Sun Public License 1.0",
                      value: "SPL-1.0",
                    },
                    {
                      label: "Upstream Compatibility License v1.0",
                      value: "UCL-1.0",
                    },
                    {
                      label: "Unicode Data Files and Software License",
                      value: "Unicode-DFS-2015",
                    },
                    {
                      label: "Unicode Data Files and Software License",
                      value: "Unicode-DFS-2016",
                    },
                    {
                      label: "The Unlicense",
                      value: "Unlicense",
                    },
                    {
                      label: "Universal Permissive License",
                      value: "UPL-1.0",
                    },
                    {
                      label: "Vovida Software License v. 1.0",
                      value: "VSL-1.0",
                    },
                    {
                      label: "W3C License",
                      value: "W3C",
                    },
                    {
                      label: "Sybase Open Watcom Public License 1.0",
                      value: "Watcom-1.0",
                    },
                    {
                      label: "X.Net License",
                      value: "Xnet",
                    },
                    {
                      label: "wxWindows Library License",
                      value: "wxWindows",
                    },
                    {
                      label: "zlib/libpng license",
                      value: "Zlib",
                    },
                    {
                      label: "Zope Public License 2.0",
                      value: "ZPL-2.0",
                    },
                  ],
                },
                {
                  name: "licenseURL",
                  component: "text-field",
                  label: "License URL",
                  description:
                    "Please link to where the license is indicated for this project: * i.e. license file in GitHub repository or license link in website.",
                  validate: [
                    {
                      type: "required",
                    },
                    {
                      type: validatorTypes.URL,
                    },
                  ],
                },
              ],
            },

            {
              name: "organizations",
              component: "sub-form",
              description:
                "Provide the primary organization or maintainer of this project i.e. Wikipedia",
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
                  name: "organizations[contact_email]",
                  component: "text-field",
                  label: "Contact email",
                },
              ],
            },
            {
              component: "radio",
              name: "stage",
              label: "What would you like to do?",
              description: "",
              options: [
                {
                  label: "Submit now as a DPG Nominee",
                  value: "nominee",
                },
                {
                  label: "Continue with the full submission process",
                  value: "DPG",
                },
              ],
              validate: [
                {
                  type: "required",
                },
              ],
            },
          ],
        },
        {
          title: "DPG Candidates",
          name: "step-2",
          nextStep: "step-3",
          fields: [
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
        {
          title: "Indicators 7 & 9",
          name: "step-3",
          nextStep: "step-4",
          fields: [
            {
              component: "radio",
              name: "privacy[isPrivacyCompliant]",
              label:
                "Has this project taken steps to ensure adherence with relevant privacy, domestic, and international laws? For example, the General Data Protection Regulation (GDPR) in the European Union or the Supplementary Act A/SA.1/01/10 on Personal Data Protection for the Economic Community of West African States (ECOWAS) (yes/no)",
              description: "",
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
              name: "privacy[privacyComplianceList]",
              component: "field-array",
              label: "Privacy compliance list",
              description:
                "If yes, please list some of relevant laws that the project complies with:",
              helperText: "",
              condition: {
                when: "privacy[isPrivacyCompliant]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              name: "privacy[adherenceSteps]",
              component: "field-array",
              label: "Adherence steps",
              description:
                "If yes, please describe the steps this project has taken to ensure adherence (include links to terms of service, privacy policy, or other relevant documentation):",
              helperText: "",
              condition: {
                when: "privacy[isPrivacyCompliant]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "standards[supportStandards]",
              label: "Does this project support standards?",
              description: "",
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
              name: "standards[standardsList]",
              component: "field-array",
              label: "Standards list",
              description:
                "Which standards does this project support (please list)",
              helperText: "",
              condition: {
                when: "standards[supportStandards]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              name: "standards[evidenceStandardSupport]",
              component: "text-field",
              label: "Standards support evidence",
              description:
                "Can you point to evidence of your support? (i.e. please link to your validator, open test suite, etc.)",
              helperText: "",
              condition: {
                when: "standards[supportStandards]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: validatorTypes.URL,
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "standards[implementBestPractices]",
              label:
                "Was this project built and developed according to or in adherence with any design, technical and/or sector best practices or principles? i.e. the Principles for Digital Development?",
              description: "",
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
              name: "standards[bestPracticesList]",
              component: "field-array",
              label: "Principles and best practices",
              description:
                "Which principles and best practices does this project support (please list)",
              helperText: "",
              condition: {
                when: "standards[implementBestPractices]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
          ],
        },
        {
          title: "Indicator 9a",
          name: "step-4",
          nextStep: "step-5",
          fields: [
            {
              component: "radio",
              name: "preventHarm[stepsToPreventHarm]",
              label:
                "On the whole, does this project take steps to ensure that it anticipates, prevents and does no harm?",
              description: "",
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
              name: "preventHarm[additionalInfoMechanismProcessesPolicies]",
              component: "text-field",
              label: "Additional risks and mitigation steps",
              description:
                "Please describe any additional risks and mitigation steps that this project uses to prevent harm.",
              helperText: "",
              condition: {
                when: "preventHarm[stepsToPreventHarm]",
                pattern: /Yes/,
              },
              validate: [],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "dataPrivacySecurity[collectsPII]",
              label:
                "Does this project collect or store personally identifiable information (PII) data?",
              description: "",
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
              name: "dataPrivacySecurity[typesOfDataCollected]",
              component: "field-array",
              label: "Types of PII data collected",
              description:
                "If yes - please list the types of data collected and/or stored by the project:",
              helperText: "",
              condition: {
                when: "dataPrivacySecurity[collectsPII]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "dataPrivacySecurity[thirdPartyDataSharing]",
              label:
                "If yes - does this project share this data with third parties?",
              description: "",
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
                when: "dataPrivacySecurity[collectsPII]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "dataPrivacySecurity[dataSharingCircumstances]",
              component: "field-array",
              label: "Data sharing circumstances",
              description:
                "Please describe the circumstances with which this project shares data with third parties. Please add links as relevant.",
              helperText: "",
              condition: {
                when: "dataPrivacySecurity[thirdPartyDataSharing]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "dataPrivacySecurity[ensurePrivacySecurity]",
              label: "Ensure privacy and security",
              description:
                "If yes - does the project ensure the privacy and security of this data and has it taken steps to prevent adverse impacts resulting from its collection, storage and distribution.",
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
                when: "dataPrivacySecurity[thirdPartyDataSharing]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "dataPrivacySecurity[privacySecurityDescription]",
              component: "text-field",
              label: "Privacy security description",
              description:
                "If yes - please describe the steps, and include a link to the privacy policy and/or terms of service:",
              helperText: "",
              condition: {
                when: "dataPrivacySecurity[thirdPartyDataSharing]",
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
        {
          title: "Indicator 9b - Inappropriate & Illegal Content",
          name: "step-5",
          nextStep: "step-6",
          fields: [
            {
              component: "radio",
              name: "inappropriateIllegalContent[collectStoreDistribute]",
              label: "Does this project collect, store or distribute content?",
              description: "",
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
              name: "inappropriateIllegalContent[type]",
              component: "text-field",
              label: "Kind of content",
              description:
                "If yes - what kinds of content does this project, collect, store or distribute? (i.e. childrens books)",
              helperText: "",
              condition: {
                when: "inappropriateIllegalContent[collectStoreDistribute]",
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
              component: "radio",
              name: "inappropriateIllegalContent[contentFilter]",
              label:
                "If yes - does this project have policies that describe what is considered innappropriate content? (i.e. child sexual abuse materials)",
              description: "",
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
                when: "inappropriateIllegalContent[collectStoreDistribute]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name:
                "inappropriateIllegalContent[policyGuidelinesDocumentationLink]",
              component: "text-field",
              label: "Policy guideline documentation link",
              description:
                "If yes - please link to the relevant policy/guidelines/documentation.",
              helperText: "",
              condition: {
                when: "inappropriateIllegalContent[collectStoreDistribute]",
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
              name: "inappropriateIllegalContent[illegalContentDetection]",
              label:
                "If yes - does this project have mechanisms for detecting and moderating innappropriate/illegal content?",
              description: "",
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
                when: "inappropriateIllegalContent[collectStoreDistribute]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name:
                "inappropriateIllegalContent[illegalContentDetectionMechanism]",
              component: "text-field",
              label: "Illegal content detection mechanism",
              description:
                "If yes - please describe the mechanism for detecting, reporting and removing innapropriate/illegal content (Please include the average response time for assessment and/or action. Link to any policies or descriptions of how inappropriate content is handled):",
              helperText: "",
              condition: {
                when: "inappropriateIllegalContent[collectStoreDistribute]",
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
        {
          title: "Indicator 9c - Protection from harassment",
          name: "step-6",
          nextStep: "step-7",
          fields: [
            {
              component: "radio",
              name: "protectionFromHarassment[userInteraction]",
              label:
                "Does this project facilitate interactions with or between users or contributors?",
              description: "",
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
              component: "radio",
              name:
                "protectionFromHarassment[addressSafetySecurityUnderageUsers]",
              label:
                "If yes - does the project take steps to address the safety and security of underage users?",
              description: "",
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
                when: "protectionFromHarassment[userInteraction]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name:
                "protectionFromHarassment[stepsAddressRiskPreventSafetyUnderageUsers]",
              component: "field-array",
              label: "Steps to address risk",
              description:
                "If yes - please describe the steps this project takes to address risk or prevent access by underage users:",
              helperText: "",
              condition: {
                when: "protectionFromHarassment[userInteraction]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
            {
              component: "radio",
              name: "protectionFromHarassment[griefAbuseHarassmentProtection]",
              label:
                "If yes - does the project help users and contributors protect themselves against grief, abuse, and harassment.",
              description: "",
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
                when: "protectionFromHarassment[userInteraction]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
            },
            {
              name: "protectionFromHarassment[harassmentProtectionSteps]",
              component: "field-array",
              label: "Steps to address risk",
              description:
                "If yes - please describe the steps taken to help users protect themselves.",
              helperText: "",
              condition: {
                when: "protectionFromHarassment[userInteraction]",
                pattern: /Yes/,
              },
              validate: [
                {
                  type: "required",
                },
              ],
              fields: [
                {
                  component: "text-field",
                },
              ],
              classes: { root: "conditional" },
            },
          ],
        },
        {
          title: "Locations - development & deployment countries",
          name: "step-7",
          fields: [
            {
              component: "field-array",
              name: "locations[developmentCountries]",
              label: "Choose development countries",
              fieldKey: "field_array",
              title: "Choose development countries",
              description: "What country was this project developed in?",
              RemoveButtonGridProps: { xs: 3 },
              FieldGroupGridProps: { xs: 9 },
              fields: [
                {
                  component: "select",
                  simpleValue: true,
                  options: [
                    {
                      label: "Afghanistan",
                      value: "Afghanistan",
                    },
                    {
                      label: "Albania",
                      value: "Albania",
                    },
                    {
                      label: "Algeria",
                      value: "Algeria",
                    },
                    {
                      label: "Andorra",
                      value: "Andorra",
                    },
                    {
                      label: "Angola",
                      value: "Angola",
                    },
                    {
                      label: "Antigua and Barbuda",
                      value: "Antigua and Barbuda",
                    },
                    {
                      label: "Argentina",
                      value: "Argentina",
                    },
                    {
                      label: "Armenia",
                      value: "Armenia",
                    },
                    {
                      label: "Australia",
                      value: "Australia",
                    },
                    {
                      label: "Austria",
                      value: "Austria",
                    },
                    {
                      label: "Azerbaijan",
                      value: "Azerbaijan",
                    },
                    {
                      label: "Bahamas",
                      value: "Bahamas",
                    },
                    {
                      label: "Bahrain",
                      value: "Bahrain",
                    },
                    {
                      label: "Bangladesh",
                      value: "Bangladesh",
                    },
                    {
                      label: "Barbados",
                      value: "Barbados",
                    },
                    {
                      label: "Belarus",
                      value: "Belarus",
                    },
                    {
                      label: "Belgium",
                      value: "Belgium",
                    },
                    {
                      label: "Belize",
                      value: "Belize",
                    },
                    {
                      label: "Benin",
                      value: "Benin",
                    },
                    {
                      label: "Bhutan",
                      value: "Bhutan",
                    },
                    {
                      label: "Bolivia",
                      value: "Bolivia",
                    },
                    {
                      label: "Bosnia and Herzegovina",
                      value: "Bosnia and Herzegovina",
                    },
                    {
                      label: "Botswana",
                      value: "Botswana",
                    },
                    {
                      label: "Brazil",
                      value: "Brazil",
                    },
                    {
                      label: "Brunei",
                      value: "Brunei",
                    },
                    {
                      label: "Bulgaria",
                      value: "Bulgaria",
                    },
                    {
                      label: "Burkina Faso",
                      value: "Burkina Faso",
                    },
                    {
                      label: "Burundi",
                      value: "Burundi",
                    },
                    {
                      label: "Côte d'Ivoire",
                      value: "Côte d'Ivoire",
                    },
                    {
                      label: "Cabo Verde",
                      value: "Cabo Verde",
                    },
                    {
                      label: "Cambodia",
                      value: "Cambodia",
                    },
                    {
                      label: "Cameroon",
                      value: "Cameroon",
                    },
                    {
                      label: "Canada",
                      value: "Canada",
                    },
                    {
                      label: "Central African Republic",
                      value: "Central African Republic",
                    },
                    {
                      label: "Chad",
                      value: "Chad",
                    },
                    {
                      label: "Chile",
                      value: "Chile",
                    },
                    {
                      label: "China",
                      value: "China",
                    },
                    {
                      label: "Colombia",
                      value: "Colombia",
                    },
                    {
                      label: "Comoros",
                      value: "Comoros",
                    },
                    {
                      label: "Congo (Congo-Brazzaville)",
                      value: "Congo (Congo-Brazzaville)",
                    },
                    {
                      label: "Costa Rica",
                      value: "Costa Rica",
                    },
                    {
                      label: "Croatia",
                      value: "Croatia",
                    },
                    {
                      label: "Cuba",
                      value: "Cuba",
                    },
                    {
                      label: "Cyprus",
                      value: "Cyprus",
                    },
                    {
                      label: "Czechia (Czech Republic)",
                      value: "Czechia (Czech Republic)",
                    },
                    {
                      label: "Democratic Republic of the Congo",
                      value: "Democratic Republic of the Congo",
                    },
                    {
                      label: "Denmark",
                      value: "Denmark",
                    },
                    {
                      label: "Djibouti",
                      value: "Djibouti",
                    },
                    {
                      label: "Dominica",
                      value: "Dominica",
                    },
                    {
                      label: "Dominican Republic",
                      value: "Dominican Republic",
                    },
                    {
                      label: "Ecuador",
                      value: "Ecuador",
                    },
                    {
                      label: "El Salvador",
                      value: "El Salvador",
                    },
                    {
                      label: "Equatorial Guinea",
                      value: "Equatorial Guinea",
                    },
                    {
                      label: "Eritrea",
                      value: "Eritrea",
                    },
                    {
                      label: "Estonia",
                      value: "Estonia",
                    },
                    {
                      label: "Eswatini (fmr. 'Swaziland')",
                      value: "Eswatini (fmr. 'Swaziland')",
                    },
                    {
                      label: "Ethiopia",
                      value: "Ethiopia",
                    },
                    {
                      label: "Fiji",
                      value: "Fiji",
                    },
                    {
                      label: "Finland",
                      value: "Finland",
                    },
                    {
                      label: "France",
                      value: "France",
                    },
                    {
                      label: "Gabon",
                      value: "Gabon",
                    },
                    {
                      label: "Gambia",
                      value: "Gambia",
                    },
                    {
                      label: "Georgia",
                      value: "Georgia",
                    },
                    {
                      label: "Germany",
                      value: "Germany",
                    },
                    {
                      label: "Ghana",
                      value: "Ghana",
                    },
                    {
                      label: "Greece",
                      value: "Greece",
                    },
                    {
                      label: "Grenada",
                      value: "Grenada",
                    },
                    {
                      label: "Guatemala",
                      value: "Guatemala",
                    },
                    {
                      label: "Guinea",
                      value: "Guinea",
                    },
                    {
                      label: "Guinea-Bissau",
                      value: "Guinea-Bissau",
                    },
                    {
                      label: "Guyana",
                      value: "Guyana",
                    },
                    {
                      label: "Haiti",
                      value: "Haiti",
                    },
                    {
                      label: "Holy See",
                      value: "Holy See",
                    },
                    {
                      label: "Honduras",
                      value: "Honduras",
                    },
                    {
                      label: "Hungary",
                      value: "Hungary",
                    },
                    {
                      label: "Iceland",
                      value: "Iceland",
                    },
                    {
                      label: "India",
                      value: "India",
                    },
                    {
                      label: "Indonesia",
                      value: "Indonesia",
                    },
                    {
                      label: "Iran",
                      value: "Iran",
                    },
                    {
                      label: "Iraq",
                      value: "Iraq",
                    },
                    {
                      label: "Israel",
                      value: "Israel",
                    },
                    {
                      label: "Italy",
                      value: "Italy",
                    },
                    {
                      label: "Jamaica",
                      value: "Jamaica",
                    },
                    {
                      label: "Japan",
                      value: "Japan",
                    },
                    {
                      label: "Jordan",
                      value: "Jordan",
                    },
                    {
                      label: "Kazakhstan",
                      value: "Kazakhstan",
                    },
                    {
                      label: "Kenya",
                      value: "Kenya",
                    },
                    {
                      label: "Kuwait",
                      value: "Kuwait",
                    },
                    {
                      label: "Kyrgyzstan",
                      value: "Kyrgyzstan",
                    },
                    {
                      label: "Laos",
                      value: "Laos",
                    },
                    {
                      label: "Latvia",
                      value: "Latvia",
                    },
                    {
                      label: "Lebanon",
                      value: "Lebanon",
                    },
                    {
                      label: "Lesotho",
                      value: "Lesotho",
                    },
                    {
                      label: "Liberia",
                      value: "Liberia",
                    },
                    {
                      label: "Libya",
                      value: "Libya",
                    },
                    {
                      label: "Liechtenstein",
                      value: "Liechtenstein",
                    },
                    {
                      label: "Lithuania",
                      value: "Lithuania",
                    },
                    {
                      label: "Luxembourg",
                      value: "Luxembourg",
                    },
                    {
                      label: "Madagascar",
                      value: "Madagascar",
                    },
                    {
                      label: "Malawi",
                      value: "Malawi",
                    },
                    {
                      label: "Malaysia",
                      value: "Malaysia",
                    },
                    {
                      label: "Maldives",
                      value: "Maldives",
                    },
                    {
                      label: "Mali",
                      value: "Mali",
                    },
                    {
                      label: "Malta",
                      value: "Malta",
                    },
                    {
                      label: "Marshall Islands",
                      value: "Marshall Islands",
                    },
                    {
                      label: "Mauritania",
                      value: "Mauritania",
                    },
                    {
                      label: "Mauritius",
                      value: "Mauritius",
                    },
                    {
                      label: "Mexico",
                      value: "Mexico",
                    },
                    {
                      label: "Micronesia",
                      value: "Micronesia",
                    },
                    {
                      label: "Moldova",
                      value: "Moldova",
                    },
                    {
                      label: "Monaco",
                      value: "Monaco",
                    },
                    {
                      label: "Mongolia",
                      value: "Mongolia",
                    },
                    {
                      label: "Montenegro",
                      value: "Montenegro",
                    },
                    {
                      label: "Morocco",
                      value: "Morocco",
                    },
                    {
                      label: "Mozambique",
                      value: "Mozambique",
                    },
                    {
                      label: "Myanmar",
                      value: "Myanmar",
                    },
                    {
                      label: "Namibia",
                      value: "Namibia",
                    },
                    {
                      label: "Nauru",
                      value: "Nauru",
                    },
                    {
                      label: "Nepal",
                      value: "Nepal",
                    },
                    {
                      label: "Netherlands",
                      value: "Netherlands",
                    },
                    {
                      label: "New Zealand",
                      value: "New Zealand",
                    },
                    {
                      label: "Nicaragua",
                      value: "Nicaragua",
                    },
                    {
                      label: "Niger",
                      value: "Niger",
                    },
                    {
                      label: "Nigeria",
                      value: "Nigeria",
                    },
                    {
                      label: "North Korea",
                      value: "North Korea",
                    },
                    {
                      label: "North Macedonia",
                      value: "North Macedonia",
                    },
                    {
                      label: "Norway",
                      value: "Norway",
                    },
                    {
                      label: "Oman",
                      value: "Oman",
                    },
                    {
                      label: "Pakistan",
                      value: "Pakistan",
                    },
                    {
                      label: "Palau",
                      value: "Palau",
                    },
                    {
                      label: "Palestine State",
                      value: "Palestine State",
                    },
                    {
                      label: "Panama",
                      value: "Panama",
                    },
                    {
                      label: "Papua New Guinea",
                      value: "Papua New Guinea",
                    },
                    {
                      label: "Paraguay",
                      value: "Paraguay",
                    },
                    {
                      label: "Peru",
                      value: "Peru",
                    },
                    {
                      label: "Philippines",
                      value: "Philippines",
                    },
                    {
                      label: "Poland",
                      value: "Poland",
                    },
                    {
                      label: "Portugal",
                      value: "Portugal",
                    },
                    {
                      label: "Qatar",
                      value: "Qatar",
                    },
                    {
                      label: "Romania",
                      value: "Romania",
                    },
                    {
                      label: "Russia",
                      value: "Russia",
                    },
                    {
                      label: "Rwanda",
                      value: "Rwanda",
                    },
                    {
                      label: "Saint Kitts and Nevis",
                      value: "Saint Kitts and Nevis",
                    },
                    {
                      label: "Saint Lucia",
                      value: "Saint Lucia",
                    },
                    {
                      label: "Saint Vincent and the Grenadines",
                      value: "Saint Vincent and the Grenadines",
                    },
                    {
                      label: "Samoa",
                      value: "Samoa",
                    },
                    {
                      label: "San Marino",
                      value: "San Marino",
                    },
                    {
                      label: "Sao Tome and Principe",
                      value: "Sao Tome and Principe",
                    },
                    {
                      label: "Saudi Arabia",
                      value: "Saudi Arabia",
                    },
                    {
                      label: "Senegal",
                      value: "Senegal",
                    },
                    {
                      label: "Serbia",
                      value: "Serbia",
                    },
                    {
                      label: "Seychelles",
                      value: "Seychelles",
                    },
                    {
                      label: "Sierra Leone",
                      value: "Sierra Leone",
                    },
                    {
                      label: "Singapore",
                      value: "Singapore",
                    },
                    {
                      label: "Slovakia",
                      value: "Slovakia",
                    },
                    {
                      label: "Slovenia",
                      value: "Slovenia",
                    },
                    {
                      label: "Solomon Islands",
                      value: "Solomon Islands",
                    },
                    {
                      label: "Somalia",
                      value: "Somalia",
                    },
                    {
                      label: "South Africa",
                      value: "South Africa",
                    },
                    {
                      label: "South Korea",
                      value: "South Korea",
                    },
                    {
                      label: "South Sudan",
                      value: "South Sudan",
                    },
                    {
                      label: "Spain",
                      value: "Spain",
                    },
                    {
                      label: "Sri Lanka",
                      value: "Sri Lanka",
                    },
                    {
                      label: "Sudan",
                      value: "Sudan",
                    },
                    {
                      label: "Suriname",
                      value: "Suriname",
                    },
                    {
                      label: "Sweden",
                      value: "Sweden",
                    },
                    {
                      label: "Switzerland",
                      value: "Switzerland",
                    },
                    {
                      label: "Syria",
                      value: "Syria",
                    },
                    {
                      label: "Tajikistan",
                      value: "Tajikistan",
                    },
                    {
                      label: "Tanzania",
                      value: "Tanzania",
                    },
                    {
                      label: "Thailand",
                      value: "Thailand",
                    },
                    {
                      label: "Timor-Leste",
                      value: "Timor-Leste",
                    },
                    {
                      label: "Togo",
                      value: "Togo",
                    },
                    {
                      label: "Tonga",
                      value: "Tonga",
                    },
                    {
                      label: "Trinidad and Tobago",
                      value: "Trinidad and Tobago",
                    },
                    {
                      label: "Tunisia",
                      value: "Tunisia",
                    },
                    {
                      label: "Turkey",
                      value: "Turkey",
                    },
                    {
                      label: "Turkmenistan",
                      value: "Turkmenistan",
                    },
                    {
                      label: "Tuvalu",
                      value: "Tuvalu",
                    },
                    {
                      label: "Uganda",
                      value: "Uganda",
                    },
                    {
                      label: "Ukraine",
                      value: "Ukraine",
                    },
                    {
                      label: "United Arab Emirates",
                      value: "United Arab Emirates",
                    },
                    {
                      label: "United Kingdom",
                      value: "United Kingdom",
                    },
                    {
                      label: "United States of America",
                      value: "United States of America",
                    },
                    {
                      label: "Uruguay",
                      value: "Uruguay",
                    },
                    {
                      label: "Uzbekistan",
                      value: "Uzbekistan",
                    },
                    {
                      label: "Vanuatu",
                      value: "Vanuatu",
                    },
                    {
                      label: "Venezuela",
                      value: "Venezuela",
                    },
                    {
                      label: "Vietnam",
                      value: "Vietnam",
                    },
                    {
                      label: "Yemen",
                      value: "Yemen",
                    },
                    {
                      label: "Zambia",
                      value: "Zambia",
                    },
                    {
                      label: "Zimbabwe",
                      value: "Zimbabwe",
                    },
                  ],
                },
              ],
            },
            {
              component: "field-array",
              name: "locations[deploymentCountries]",
              label: "Choose deployment countries",
              fieldKey: "field_array",
              title: "Choose deployment countries",
              description:
                "What countries is this project actively deployed in?",
              RemoveButtonGridProps: { xs: 3 },
              FieldGroupGridProps: { xs: 9 },
              fields: [
                {
                  component: "select",
                  simpleValue: true,
                  options: [
                    {
                      label: "Afghanistan",
                      value: "Afghanistan",
                    },
                    {
                      label: "Albania",
                      value: "Albania",
                    },
                    {
                      label: "Algeria",
                      value: "Algeria",
                    },
                    {
                      label: "Andorra",
                      value: "Andorra",
                    },
                    {
                      label: "Angola",
                      value: "Angola",
                    },
                    {
                      label: "Antigua and Barbuda",
                      value: "Antigua and Barbuda",
                    },
                    {
                      label: "Argentina",
                      value: "Argentina",
                    },
                    {
                      label: "Armenia",
                      value: "Armenia",
                    },
                    {
                      label: "Australia",
                      value: "Australia",
                    },
                    {
                      label: "Austria",
                      value: "Austria",
                    },
                    {
                      label: "Azerbaijan",
                      value: "Azerbaijan",
                    },
                    {
                      label: "Bahamas",
                      value: "Bahamas",
                    },
                    {
                      label: "Bahrain",
                      value: "Bahrain",
                    },
                    {
                      label: "Bangladesh",
                      value: "Bangladesh",
                    },
                    {
                      label: "Barbados",
                      value: "Barbados",
                    },
                    {
                      label: "Belarus",
                      value: "Belarus",
                    },
                    {
                      label: "Belgium",
                      value: "Belgium",
                    },
                    {
                      label: "Belize",
                      value: "Belize",
                    },
                    {
                      label: "Benin",
                      value: "Benin",
                    },
                    {
                      label: "Bhutan",
                      value: "Bhutan",
                    },
                    {
                      label: "Bolivia",
                      value: "Bolivia",
                    },
                    {
                      label: "Bosnia and Herzegovina",
                      value: "Bosnia and Herzegovina",
                    },
                    {
                      label: "Botswana",
                      value: "Botswana",
                    },
                    {
                      label: "Brazil",
                      value: "Brazil",
                    },
                    {
                      label: "Brunei",
                      value: "Brunei",
                    },
                    {
                      label: "Bulgaria",
                      value: "Bulgaria",
                    },
                    {
                      label: "Burkina Faso",
                      value: "Burkina Faso",
                    },
                    {
                      label: "Burundi",
                      value: "Burundi",
                    },
                    {
                      label: "Côte d'Ivoire",
                      value: "Côte d'Ivoire",
                    },
                    {
                      label: "Cabo Verde",
                      value: "Cabo Verde",
                    },
                    {
                      label: "Cambodia",
                      value: "Cambodia",
                    },
                    {
                      label: "Cameroon",
                      value: "Cameroon",
                    },
                    {
                      label: "Canada",
                      value: "Canada",
                    },
                    {
                      label: "Central African Republic",
                      value: "Central African Republic",
                    },
                    {
                      label: "Chad",
                      value: "Chad",
                    },
                    {
                      label: "Chile",
                      value: "Chile",
                    },
                    {
                      label: "China",
                      value: "China",
                    },
                    {
                      label: "Colombia",
                      value: "Colombia",
                    },
                    {
                      label: "Comoros",
                      value: "Comoros",
                    },
                    {
                      label: "Congo (Congo-Brazzaville)",
                      value: "Congo (Congo-Brazzaville)",
                    },
                    {
                      label: "Costa Rica",
                      value: "Costa Rica",
                    },
                    {
                      label: "Croatia",
                      value: "Croatia",
                    },
                    {
                      label: "Cuba",
                      value: "Cuba",
                    },
                    {
                      label: "Cyprus",
                      value: "Cyprus",
                    },
                    {
                      label: "Czechia (Czech Republic)",
                      value: "Czechia (Czech Republic)",
                    },
                    {
                      label: "Democratic Republic of the Congo",
                      value: "Democratic Republic of the Congo",
                    },
                    {
                      label: "Denmark",
                      value: "Denmark",
                    },
                    {
                      label: "Djibouti",
                      value: "Djibouti",
                    },
                    {
                      label: "Dominica",
                      value: "Dominica",
                    },
                    {
                      label: "Dominican Republic",
                      value: "Dominican Republic",
                    },
                    {
                      label: "Ecuador",
                      value: "Ecuador",
                    },
                    {
                      label: "El Salvador",
                      value: "El Salvador",
                    },
                    {
                      label: "Equatorial Guinea",
                      value: "Equatorial Guinea",
                    },
                    {
                      label: "Eritrea",
                      value: "Eritrea",
                    },
                    {
                      label: "Estonia",
                      value: "Estonia",
                    },
                    {
                      label: "Eswatini (fmr. 'Swaziland')",
                      value: "Eswatini (fmr. 'Swaziland')",
                    },
                    {
                      label: "Ethiopia",
                      value: "Ethiopia",
                    },
                    {
                      label: "Fiji",
                      value: "Fiji",
                    },
                    {
                      label: "Finland",
                      value: "Finland",
                    },
                    {
                      label: "France",
                      value: "France",
                    },
                    {
                      label: "Gabon",
                      value: "Gabon",
                    },
                    {
                      label: "Gambia",
                      value: "Gambia",
                    },
                    {
                      label: "Georgia",
                      value: "Georgia",
                    },
                    {
                      label: "Germany",
                      value: "Germany",
                    },
                    {
                      label: "Ghana",
                      value: "Ghana",
                    },
                    {
                      label: "Greece",
                      value: "Greece",
                    },
                    {
                      label: "Grenada",
                      value: "Grenada",
                    },
                    {
                      label: "Guatemala",
                      value: "Guatemala",
                    },
                    {
                      label: "Guinea",
                      value: "Guinea",
                    },
                    {
                      label: "Guinea-Bissau",
                      value: "Guinea-Bissau",
                    },
                    {
                      label: "Guyana",
                      value: "Guyana",
                    },
                    {
                      label: "Haiti",
                      value: "Haiti",
                    },
                    {
                      label: "Holy See",
                      value: "Holy See",
                    },
                    {
                      label: "Honduras",
                      value: "Honduras",
                    },
                    {
                      label: "Hungary",
                      value: "Hungary",
                    },
                    {
                      label: "Iceland",
                      value: "Iceland",
                    },
                    {
                      label: "India",
                      value: "India",
                    },
                    {
                      label: "Indonesia",
                      value: "Indonesia",
                    },
                    {
                      label: "Iran",
                      value: "Iran",
                    },
                    {
                      label: "Iraq",
                      value: "Iraq",
                    },
                    {
                      label: "Israel",
                      value: "Israel",
                    },
                    {
                      label: "Italy",
                      value: "Italy",
                    },
                    {
                      label: "Jamaica",
                      value: "Jamaica",
                    },
                    {
                      label: "Japan",
                      value: "Japan",
                    },
                    {
                      label: "Jordan",
                      value: "Jordan",
                    },
                    {
                      label: "Kazakhstan",
                      value: "Kazakhstan",
                    },
                    {
                      label: "Kenya",
                      value: "Kenya",
                    },
                    {
                      label: "Kuwait",
                      value: "Kuwait",
                    },
                    {
                      label: "Kyrgyzstan",
                      value: "Kyrgyzstan",
                    },
                    {
                      label: "Laos",
                      value: "Laos",
                    },
                    {
                      label: "Latvia",
                      value: "Latvia",
                    },
                    {
                      label: "Lebanon",
                      value: "Lebanon",
                    },
                    {
                      label: "Lesotho",
                      value: "Lesotho",
                    },
                    {
                      label: "Liberia",
                      value: "Liberia",
                    },
                    {
                      label: "Libya",
                      value: "Libya",
                    },
                    {
                      label: "Liechtenstein",
                      value: "Liechtenstein",
                    },
                    {
                      label: "Lithuania",
                      value: "Lithuania",
                    },
                    {
                      label: "Luxembourg",
                      value: "Luxembourg",
                    },
                    {
                      label: "Madagascar",
                      value: "Madagascar",
                    },
                    {
                      label: "Malawi",
                      value: "Malawi",
                    },
                    {
                      label: "Malaysia",
                      value: "Malaysia",
                    },
                    {
                      label: "Maldives",
                      value: "Maldives",
                    },
                    {
                      label: "Mali",
                      value: "Mali",
                    },
                    {
                      label: "Malta",
                      value: "Malta",
                    },
                    {
                      label: "Marshall Islands",
                      value: "Marshall Islands",
                    },
                    {
                      label: "Mauritania",
                      value: "Mauritania",
                    },
                    {
                      label: "Mauritius",
                      value: "Mauritius",
                    },
                    {
                      label: "Mexico",
                      value: "Mexico",
                    },
                    {
                      label: "Micronesia",
                      value: "Micronesia",
                    },
                    {
                      label: "Moldova",
                      value: "Moldova",
                    },
                    {
                      label: "Monaco",
                      value: "Monaco",
                    },
                    {
                      label: "Mongolia",
                      value: "Mongolia",
                    },
                    {
                      label: "Montenegro",
                      value: "Montenegro",
                    },
                    {
                      label: "Morocco",
                      value: "Morocco",
                    },
                    {
                      label: "Mozambique",
                      value: "Mozambique",
                    },
                    {
                      label: "Myanmar",
                      value: "Myanmar",
                    },
                    {
                      label: "Namibia",
                      value: "Namibia",
                    },
                    {
                      label: "Nauru",
                      value: "Nauru",
                    },
                    {
                      label: "Nepal",
                      value: "Nepal",
                    },
                    {
                      label: "Netherlands",
                      value: "Netherlands",
                    },
                    {
                      label: "New Zealand",
                      value: "New Zealand",
                    },
                    {
                      label: "Nicaragua",
                      value: "Nicaragua",
                    },
                    {
                      label: "Niger",
                      value: "Niger",
                    },
                    {
                      label: "Nigeria",
                      value: "Nigeria",
                    },
                    {
                      label: "North Korea",
                      value: "North Korea",
                    },
                    {
                      label: "North Macedonia",
                      value: "North Macedonia",
                    },
                    {
                      label: "Norway",
                      value: "Norway",
                    },
                    {
                      label: "Oman",
                      value: "Oman",
                    },
                    {
                      label: "Pakistan",
                      value: "Pakistan",
                    },
                    {
                      label: "Palau",
                      value: "Palau",
                    },
                    {
                      label: "Palestine State",
                      value: "Palestine State",
                    },
                    {
                      label: "Panama",
                      value: "Panama",
                    },
                    {
                      label: "Papua New Guinea",
                      value: "Papua New Guinea",
                    },
                    {
                      label: "Paraguay",
                      value: "Paraguay",
                    },
                    {
                      label: "Peru",
                      value: "Peru",
                    },
                    {
                      label: "Philippines",
                      value: "Philippines",
                    },
                    {
                      label: "Poland",
                      value: "Poland",
                    },
                    {
                      label: "Portugal",
                      value: "Portugal",
                    },
                    {
                      label: "Qatar",
                      value: "Qatar",
                    },
                    {
                      label: "Romania",
                      value: "Romania",
                    },
                    {
                      label: "Russia",
                      value: "Russia",
                    },
                    {
                      label: "Rwanda",
                      value: "Rwanda",
                    },
                    {
                      label: "Saint Kitts and Nevis",
                      value: "Saint Kitts and Nevis",
                    },
                    {
                      label: "Saint Lucia",
                      value: "Saint Lucia",
                    },
                    {
                      label: "Saint Vincent and the Grenadines",
                      value: "Saint Vincent and the Grenadines",
                    },
                    {
                      label: "Samoa",
                      value: "Samoa",
                    },
                    {
                      label: "San Marino",
                      value: "San Marino",
                    },
                    {
                      label: "Sao Tome and Principe",
                      value: "Sao Tome and Principe",
                    },
                    {
                      label: "Saudi Arabia",
                      value: "Saudi Arabia",
                    },
                    {
                      label: "Senegal",
                      value: "Senegal",
                    },
                    {
                      label: "Serbia",
                      value: "Serbia",
                    },
                    {
                      label: "Seychelles",
                      value: "Seychelles",
                    },
                    {
                      label: "Sierra Leone",
                      value: "Sierra Leone",
                    },
                    {
                      label: "Singapore",
                      value: "Singapore",
                    },
                    {
                      label: "Slovakia",
                      value: "Slovakia",
                    },
                    {
                      label: "Slovenia",
                      value: "Slovenia",
                    },
                    {
                      label: "Solomon Islands",
                      value: "Solomon Islands",
                    },
                    {
                      label: "Somalia",
                      value: "Somalia",
                    },
                    {
                      label: "South Africa",
                      value: "South Africa",
                    },
                    {
                      label: "South Korea",
                      value: "South Korea",
                    },
                    {
                      label: "South Sudan",
                      value: "South Sudan",
                    },
                    {
                      label: "Spain",
                      value: "Spain",
                    },
                    {
                      label: "Sri Lanka",
                      value: "Sri Lanka",
                    },
                    {
                      label: "Sudan",
                      value: "Sudan",
                    },
                    {
                      label: "Suriname",
                      value: "Suriname",
                    },
                    {
                      label: "Sweden",
                      value: "Sweden",
                    },
                    {
                      label: "Switzerland",
                      value: "Switzerland",
                    },
                    {
                      label: "Syria",
                      value: "Syria",
                    },
                    {
                      label: "Tajikistan",
                      value: "Tajikistan",
                    },
                    {
                      label: "Tanzania",
                      value: "Tanzania",
                    },
                    {
                      label: "Thailand",
                      value: "Thailand",
                    },
                    {
                      label: "Timor-Leste",
                      value: "Timor-Leste",
                    },
                    {
                      label: "Togo",
                      value: "Togo",
                    },
                    {
                      label: "Tonga",
                      value: "Tonga",
                    },
                    {
                      label: "Trinidad and Tobago",
                      value: "Trinidad and Tobago",
                    },
                    {
                      label: "Tunisia",
                      value: "Tunisia",
                    },
                    {
                      label: "Turkey",
                      value: "Turkey",
                    },
                    {
                      label: "Turkmenistan",
                      value: "Turkmenistan",
                    },
                    {
                      label: "Tuvalu",
                      value: "Tuvalu",
                    },
                    {
                      label: "Uganda",
                      value: "Uganda",
                    },
                    {
                      label: "Ukraine",
                      value: "Ukraine",
                    },
                    {
                      label: "United Arab Emirates",
                      value: "United Arab Emirates",
                    },
                    {
                      label: "United Kingdom",
                      value: "United Kingdom",
                    },
                    {
                      label: "United States of America",
                      value: "United States of America",
                    },
                    {
                      label: "Uruguay",
                      value: "Uruguay",
                    },
                    {
                      label: "Uzbekistan",
                      value: "Uzbekistan",
                    },
                    {
                      label: "Vanuatu",
                      value: "Vanuatu",
                    },
                    {
                      label: "Venezuela",
                      value: "Venezuela",
                    },
                    {
                      label: "Vietnam",
                      value: "Vietnam",
                    },
                    {
                      label: "Yemen",
                      value: "Yemen",
                    },
                    {
                      label: "Zambia",
                      value: "Zambia",
                    },
                    {
                      label: "Zimbabwe",
                      value: "Zimbabwe",
                    },
                  ],
                },
              ],
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
