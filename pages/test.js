import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import FormSpy from '@data-driven-forms/react-form-renderer/dist/cjs/form-spy';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

      const LocalStorageSpy = () => (
        <FormSpy onChange={({ values }) => console.log(values)} />
      );

const schema = {
  fields: [
    {
      name: 'text-field',
      component: componentTypes.TEXT_FIELD,
      validate: [{ type: validatorTypes.EXACT_LENGTH, threshold: 5 }],
      label: '5 characters',
    },
    {
      name: 'spy',
      component: 'local-storage-spy',
    },
  ],
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  'local-storage-spy': LocalStorageSpy,
};

export default function App() {
  return (
    <div>
      <FormRenderer
        schema={schema}
        onSubmit={console.log}
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
      />
    </div>
  );
}
