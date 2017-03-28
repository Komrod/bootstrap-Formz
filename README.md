# bootstrap-Formz
Bootstrap form helper

This javascript class take an object and build a Bootstrap form.
Require: the bootstrap CSS.

## Quick start

```
var form = new BootstrapFormz({
	name: "myform",
	fields: [
		{ type: "text", value: "test", label: "Login", name: "login" },
		{ type: "password", label: "Password", name: "pwd" },
		{ type: "button", label: "Submit" }
	]
});
document.write(form.render());
```
This will create an horizontal form with a login, password and button. There are many field types and many options you can use to customize your form.

For example, you can change the default column classes for the all form or on a particular field.
```
var form = new BootstrapFormz({
	name: "myform",
	// set the default column setting for the fields:
	columns: ["col-sm-5", "col-sm-7"], 
	fields: [
		{
			type: "text",
			value: "test",
			label: "Login"
		},
		{
			type: "button",
			label: "Submit", 
			// set the column setting for this fields:
			columns: "col-sm-12"
		}
	]
});
document.write(form.render());
```

## The field types

### Text

An input with text type to enter some text on a single line.

*Options*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_text_<random_string>)
- class: CSS class to add to the input tag (default empty)
- placeholder: placeholder text (default empty)
- required: boolean, if true it puts an asterisk after the label
- value: the value of the field (default empty)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "text",
			value: "admin",
			label: "Login",
			name: "mylogin",
			required: true,
			placeholder: "Type your login here"
		}
	]
});
document.write(form.render());
```


## Add your behavior

## Examples

## Custom field

## TODO

- Add precision to currency
- Add number type
- Make a doc
- Add ids to fields
