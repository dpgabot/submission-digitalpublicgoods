import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';

const schema = {
    title: 'Digital Public Goods Submission',
    description: `This is a BETA version of our submission form and process which means we'll be learning from it and may contact you for follow-up information and input on the process as well as your project submission.`,
    fields: [{
            name: 'name',
            component: 'text-field',
            label: 'Project name',
            helperText: 'For example, Wikipedia.',
            validate: [
                {
                type: 'required'
                }
            ]
        },
        {
            name: 'description',
            component: 'text-field',
            label: 'Project Description',
            helperText: 'Include a concise 1-line description for this project.',
            validate: [
                {
                    type: 'required'
                }
            ]
        },
        {
            name: 'website',
            component: 'text-field',
            label: 'Project Website URL',
            helperText: 'Public website (string must include http(s)://)',
            validate: [
                {
                    type: 'required'
                },
                {
                    type: validatorTypes.URL
                }
            ]
        },
        {
            name: 'type',
            component: 'checkbox',
            label: 'What category best describes this project?',
            helperText: 'Select all that apply.',
            options: [
            	{
            		label: "Open Source Software",
            		value: "software"
            	},
            	{
            		label: "Open Data",
            		value: "data"
            	},
            	{
            		label: "Open Content",
            		value: "content"
            	},
            	{
            		label: "Open Artificial Intelligence (AI) Model",
            		value: "model"
            	},
            	{
            		label: "Open Standard",
            		value: "standard"
            	}
            ],
            validate: [{
                type: 'required'
            }]
        },
        {
            name: 'repositoryURL',
            component: 'text-field',
            label: 'Link to Github (or other) repository',
            helperText: 'Required for open source software - link to public repository',
            condition: {
            	when: 'type',
            	pattern: /software/
            },
            validate: [
                {
                    type: 'required'
                },
                {
                    type: validatorTypes.URL
                }
            ],
            classes: {root: 'conditional'},
        },
        {
            name: 'SDGs',
            component: 'checkbox',
            label: 'Please identify which of the Sustainable Development Goals this project is relevant to',
            helperText: 'Select all that apply.',
            options: [
            	{
            		label: "1: End Poverty in all its forms everywhere",
            		value: 1
            	},
            	{
            		label: "2: Zero Hunger",
            		value: 2
            	},
            	{
            		label: "3: Good Health and Well-Being",
            		value: 3
            	},
            	{
            		label: "4: Quality Education",
            		value: 4
            	},
            	{
            		label: "5: Gender Equity",
            		value: 5
            	},
            	{
            		label: "6: Clean Water and Sanitation",
            		value: 6
            	},
            	{
            		label: "7: Affordable and Clean Energy",
            		value: 7
            	},
            	{
            		label: "8: Decent Work and Economic Growth",
            		value: 8
            	},
            	{
            		label: "9: Industry, Innovation and Infrastructure",
            		value: 9
            	},
            	{
            		label: "10: Reduced Inequalities",
            		value: 10
            	},
            	{
            		label: "11: Sustainable Cities and Communities",
            		value: 11
            	},
            	{
            		label: "12: Responsible Consumption and Production",
            		value: 12
            	},
            	{
            		label: "13: Climate Action",
            		value: 13
            	},
            	{
            		label: "14: Life Below Water",
            		value: 14
            	},
            	{
            		label: "15: Life on Land",
            		value: 15
            	},
            	{
            		label: "16: Peace, Justice and Strong Institutions",
            		value: 16
            	},
            	{
            		label: "17: Partnerships for the Goals",
            		value: 17
            	}
            ],
            validate: [{
                type: 'required'
            }]
        },
        {
            name: 'organizations',
            component: 'sub-form',
            description: 'Provide the primary organization or maintainer of this project i.e. Wikipedia',
            classes: { root: 'NoBottomMargin' },
            fields: [
                {
                    name: 'org_type',
                    component: 'text-field',
                    initalValue: 'owner',
                    hideField: true,
                    validate: [
                        {
                            type: 'required'
                        }
                    ]
                },
                {
                    name: 'name',
                    component: 'text-field',
                    label: 'Name of the organization',
                    validate: [
                        {
                            type: 'required'
                        }
                    ]
                },
                {
                    name: 'website',
                    component: 'text-field',
                    label: 'Website of the organization',
                    validate: [
                        {
                            type: 'required'
                        },
                        {
                            type: validatorTypes.URL
                        }
                    ],
                },
                {
                    name: 'contact_name',
                    component: 'text-field',
                    label: 'Organization website'
                },
                {
                    name: 'contact_email',
                    component: 'text-field',
                    label: 'Organization website'
                },
            ]

        }
    ]
};

// Dynamically add a subform for each SDG that only display conditionally if the 
// corresponding SDG checkbox is checked. Validation for these fields is coded in React, not here.
for(let i=1; i<=17; i++) {
    // Insert these fields right after the SDGs so that they get displayed immediately below
    const SDGindex = schema.fields.findIndex((e) => e.name == 'SDGs');
    schema.fields.splice(SDGindex + i, 0,
        {
            name: 'subform'+i,
            component: 'sub-form',
            description: 'Please supply information or link to support relevance to SDG '+i+':',
            condition: {
                when: 'SDGs',
                pattern: new RegExp('\\b'+i+'\\b')
            },
            classes: {root: 'conditional'},
            fields: [
                {
                    name: 'evidenceText'+i,
                    component: 'text-field',
                    label: 'Description:'           
                },
                {
                    name: 'evidenceURL'+i,
                    component: 'text-field',
                    label: 'URL:',
                    validate: [{
                        type: validatorTypes.URL
                    }],
                }
            ]
        }
    )
}

export default schema;