
# Bootstrap-Formz

Bootstrap form build helper.

This javascript class takes a simple object and builds Bootstrap form HTML.
- Required: the bootstrap CSS. 
- Not required: no need to use jQuery or bootstrap JS.

There is usually 2 columns: the label and the input field.

*Features*
- Basic fields: text, password, select, checkbox, radio, file, textarea, button, label
- Special fields: image, email, currency, inline, column
- Customizable column classes, init and ready functions and input classes
- Define your own field for more behaviors


## Quick start

```
// create the form
var form = new BootstrapFormz({
	name: "myform",
	fields: [
		{ type: "text", value: "test", label: "Login", name: "login" },
		{ type: "password", label: "Password", name: "pwd" },
		{ type: "button", label: "Submit" }
	]
});

// just call render() on the Formz object and get the HTML
var html = form.render();

// Then just write it to the document or whatever you want
document.write(html);
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

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_text_<random_string>)
- class: CSS class to add to the input tag (default empty)
- placeholder: placeholder text (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- value: the value of the field (default empty)
- columns: string or array of the column classes to use (default form columns)

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


### Checkbox

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_checkbox_<random_string>)
- class: CSS class to add to the input tag (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- checked: boolean, true for cheked (default false)
- value: string (or array of strings if multiple) for the input value (default "1")
- text: string of the checkbox you can click to change the state, 
- options: array of strings "value|text" to have multiple checkboxes. if options exists, value is ignored
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "checkbox",
			label: "Choose a contact method",
			name: "mycheck",
			text: "By email"
		}
	]
});
document.write(form.render());
```

Using options to have multiple checkboxes:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "checkbox",
			label:  "Choose a contact method",
			name: "mycheck",
			options: ["email|By email", "call|Call me maybe", "no|No thanks"]
		}
	]
});
document.write(form.render());
```


### Radio

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_checkbox_<random_string>)
- class: CSS class to add to the input tag (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- checked: boolean, true for cheked (default false)
- value: value string (or array of strings if multiple) 
- text: text of the input
- options: array of strings "value|text" to have multiple checkboxes.
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "checkbox",
			label: "Choose a contact method",
			name: "mycheck",
			value: "By email"
		}
	]
});
document.write(form.render());
```

Using options to have multiple checkboxes:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "checkbox",
			label:  "Choose a contact method",
			name: "mycheck",
			options: ["email|By email", "call|Call me maybe", "no|No thanks"]
		}
	]
});
document.write(form.render());
```


### Password

An input with password type to enter your protected text on a single line.

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_password_<random_string>)
- class: CSS class to add to the input tag (default empty)
- placeholder: placeholder text (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "password",
			label: "Password",
			name: "mypassword",
			required: true,
			placeholder: "Type your password here"
		}
	]
});
document.write(form.render());
```


### File

An input with file type to select and send your file.

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_file_<random_string>)
- class: CSS class to add to the input tag (default empty)
- placeholder: placeholder text (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "file",
			label: "Your file",
			name: "myfile",
		}
	]
});
document.write(form.render());
```


### Select

An input with select type to select a value from a list

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_select_<random_string>)
- class: CSS class to add to the input tag (default empty)
- multiple: boolean, if true you can select multiple values (default false)
- required: boolean, if true it puts an asterisk after the label (default false)
- options: array of strings "value|text"
- value: string or array of strings for default selected items
- rows: number of lines (default undefined)
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "select",
			label: "Choose your gender",
			name: "mygender",
			options: ["m|male", "f|female", "v|velocirator", "o|other"]
		}
	]
});
document.write(form.render());
```

Select multiple values on multiple lines:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "select",
			label: "Choose your gender",
			name: "mygender",
			options: ["m|male", "f|female", "v|velocirator", "o|other"],
			multiple: true,
			rows: 6
		}
	]
});
document.write(form.render());
```


### Textarea

An textarea to type some text on multiple lines

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_textarea_<random_string>)
- class: CSS class to add to the input tag (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- value: string value, caan have line breaks (default empty)
- rows: number of lines (default undefined)
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "select",
			label: "Choose your gender",
			name: "mygender",
			options: ["m|male", "f|female", "v|velocirator", "o|other"]
		}
	]
});
document.write(form.render());
```

Select multiple values on multiple lines:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "select",
			label: "Choose your gender",
			name: "mygender",
			options: ["m|male", "f|female", "v|velocirator", "o|other"],
			multiple: true,
			rows: 6
		}
	]
});
document.write(form.render());
```


### Button

A simple button

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_button_<random_string>)
- class: CSS class to add to the input tag (default empty)
- value: text of the button (default empty)
- columns: string or array of the column classes to use (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "button",
			label: "Click here",
			name: "mybutton",
		},
		ready: function(field) {
			// field.click(function() {
			// });
		}
	]
});
document.write(form.render());
```

Add a button with red background by changing the class:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "button",
			label: "Danger",
			name: "mybutton",
			class: "btn-danger"
		}
	]
});
document.write(form.render());
```


### Label

A simple label. This field is use to show the label on other field or in a cell

*Parameters*:
- label: text on the label column (default empty)
- class: CSS class to add to the label tag (default empty)
- name: name of the field the label is refering to
- required: boolean, if true it puts an asterisk after the label (default false)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "label",
			label: "You got me!",
			name: "myinput"
		}
	]
});
document.write(form.render());
```


### Inline

A list of fields in an inline setting

*Parameters*:
- label: text on the label column (default empty)
- class: CSS class to add to the label tag (default empty)
- required: boolean, if true it puts an asterisk after the label (default false)
- list: array of fields to show in an inline setting

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "inline",
			label: "Some inputs",
			list: [
				{type: "checkbox", text: "Change me"},
				{type: "text"},
				{type: "button", value: "Submit"}
			]
		}
	]
});
document.write(form.render());
```

*Behavior:*
- Each fields in the list have no label

You can also put the inline fields in one cell without label and change the column class:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "inline",
			list: [
				{type: "checkbox", text: "Change me"},
				{type: "text"},
				{type: "button", value: "Submit"}
			],
			columns: "col-sm-12"
		}
	]
});
document.write(form.render());
```


### Column

A list of columns where you can show a field in each one

*Parameters*:
- list: array of fields to add to each column. First is in column 1, second in column 2 ...
- columns: string or array of strings of the column classes (default form columns)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "column",
			list: [
				{type: "label", label: "This is in 3 columns"},
				{type: "text", value: "test"},
				{type: "button", value: "Submit"}
			],
			columns: ["col-sm-3", "col-sm-4", "col-sm-5"]
		}
	]
});
document.write(form.render());
```

*Behavior:*
- Each fields in the list have no label

You can also put the inline fields in one cell without label and change the column class:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "inline",
			list: [
				{type: "checkbox", text: "Change me"},
				{type: "text"},
				{type: "button", value: "Submit"}
			],
			columns: "col-sm-12"
		}
	]
});
document.write(form.render());
```


### Email

An input to enter an email address

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_email_<random_string>)
- class: CSS class to add to the input tag (default empty)
- value: text of the input (default empty)
- columns: string or array of the column classes to use (default form columns)
- required: boolean, if true it puts an asterisk after the label (default false)
- placeholder: placeholder text (default empty)
- symbol: the symbol of the email at the begining of the field (default "@")

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "email",
			label: "Your email",
			name: "myemail",
		},
		ready: function(field) {

		}
	]
});
document.write(form.render());
```

*Behavior:*
- Turns red when the text is not an email or green on success
- No validation behavior on form submit


### Currency

An input to enter an amount of money

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_currency_<random_string>)
- class: CSS class to add to the input tag (default empty)
- value: amount of the input, must be a number or float value (default 0.00)
- columns: string or array of the column classes to use (default form columns)
- required: boolean, if true it puts an asterisk after the label (default false)
- symbol: the symbol of the currency at the begining of the field (default "$")

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "currency",
			label: "Transfer",
			name: "mymoney",
		}
	]
});
document.write(form.render());
```

*Behavior:*
- Convert string to float with a precision of 2 on change event
- No validation behavior on form submit


### Image

An field to show and modify an image

*Parameters*:
- label: text on the label column (default empty)
- name: name of the field, must be unique (default field_image_<random_string>)
- url: the URL of the image, if omitted this field only shows a file input (default undefined)
- columns: string or array of the column classes to use (default form columns)
- required: boolean, if true it puts an asterisk after the label (default false)
- preview_click : custom function for full preview (default is a quick preview function)
- preview: if false, no full preview on the image (default undefined)
- change: if false, no change button (default undefined)
- delete: if false, no delete / restore button (default undefined)

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "image",
			label: "Your avatar",
			name: "myavatar",
			url: "image/avatar/15240.png"
		}
	]
});
document.write(form.render());
```

*Behavior:*
- The Change button shows / hides the input file to upload your own image and puts the image on a changed state (input <name>__state is set to "changed")
- The Delete button puts the image on a deleted state (input <name>__state is set to "deleted")
- The Restore button (visible on deleted state) resets the image state (input <name>__state is set to "")
- No validation behavior on form submit

An image field without the options to change or delete the image:
```
var form = new BootstrapFormz({
	fields: [
		{
			type: "image",
			label: "Your avatar",
			name: "myavatar",
			url: "image/avatar/15240.png",
			delete: false,
			change: false
		}
	]
});
document.write(form.render());
```


## Add your behavior

### Initialization

Each field have a init function that is called when the field is initiated. This function would normally set the default values of variables if not set. But if you change the function, it can do other things.
When the init function is called, the form HTML is generating so the input is not yet on the page.

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "text",
			label: "Your text",
			name: "mytext",
			value: "",
			init: function() {
				// this.super.init();
				alert('text input initiated');
			}
		}
	]
});
document.write(form.render());
```

### Ready

Each field have a ready function that is called when DOM is ready or the formz.ready() function is called. If you ouput the form on your document, the function can access the input if you

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "text",
			label: "Your text",
			name: "mytext",
			value: "",
			init: function() {
				// this.super.init();
				alert('text input initiated');
			}
		}
	]
});
document.write(form.render());
```

### Image full preview

You can replace the full preview open function to put your own.

```
var form = new BootstrapFormz({
	fields: [
		{
			type: "image",
			label: "An image",
			name: "myimage",
			url: "image/yourmom.png",
			preview_click: function() {
				alert('custom full image preview');
			}
		}
	]
});
document.write(form.render());
```

## Examples

## Custom field

### Basics

### select subcategory


## Version

### 0.1
- First version


## TODO

- Change default checkbox value to "1"
- disabled and readonly properties
- Add precision to currency
- Add number type field
- Finish the doc
- Add ids to fields
- Call super function to call the parent function
- Field function: change() click() keyup() keydown() validate()
- Form function submit()
- Disable email correct value detection
- Change preview_click() to preview() on field image
