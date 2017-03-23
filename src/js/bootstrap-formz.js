   
function BootstrapFormz(form) {
    this.form = form;
}


BootstrapFormz.prototype.randomString = function(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};


BootstrapFormz.prototype.renderCell = function(clss, field) {
    var str = '';

    if (field.type && field.type == 'label') {
        field.class = field.class || '';
        field.class += ' '+clss;
        clss = '';
    }

    str += '<div class="' + clss + '">';
    if (field) {
        str += this.renderInput(field);
    }
    str += '</div>';

    return str;
};


BootstrapFormz.prototype.renderInput = function(field) {
    var str = '';

    field.name = field.name || '';
    field.label = field.label || '';
    field.value = field.value || '';
    field.class = field.class || '';
    field.required = field.required || false;
    field.placeholder = field.placeholder || '';

    if (field.type) {

        if (field.required) {
            var required_html = '<span class="required">*</span>';
        } else {
            var required_html = '';
        }
        

        if (field.type == 'currency') {
            str += '<div class="input-group">'+"\n";
            str += '<div class="input-group-addon">'+field.symbol+'</div>'+"\n";
            str += '<input type="text" class="form-control currency '+field.class+'" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>'+"\n";
            str += '</div>'+"\n";
        } else 

        if (field.type == 'label') {
            str += '<label for="'+field.name+'" class="'+field.class+'">'+field.value+required_html+'</label>';
        } else 


        if (field.type == 'text' || field.type == 'password' || field.type == 'file') {
            str += '<input type="'+field.type+'" class="form-control '+field.class+' ';
            if (field.autocomplete) {
                str += ' autocomplete';
            }
            str += '" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>'+"\n";
            if (field.autocomplete) {
                str += '<span class="glyphicon glyphicon-align-justify form-control-feedback" aria-hidden="true"></span>'+"\n";
                if (!document.formz.data) document.formz.data = {};
                document.formz.data[field.name] = field.autocomplete;
            }
        } else


        if (field.type == 'group') {
            if (field.list) {
                for (var t=0; t<field.list.length; t++) {
                    str += this.renderInput(field.list[t]);
                }
            }
        } else 


        if (field.type == 'memo') {
            str += '<textarea class="form-control '+field.class;
            str += '" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" ';
            if (field.disabled) str += ' disabled="disabled"'
            str += ' rows="'+field.rows+'"';
            str += '>';
            str += field.value+'</textarea>'+"\n";
        } else 


        if (field.type == 'tag') {
            str += '<input type="'+field.type+'" data-role="tagsinput" class="form-control '+field.class;
            str += '" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>'+"\n";
        } else 


        if (field.type == 'email') {
            str += '<div class="input-group">'+"\n";
            str += '<div class="input-group-addon">'+field.symbol+'</div>'+"\n";
            str += '<input type="text" class="form-control email '+field.class+'" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>'+"\n";
            str += '</div>'+"\n";
        } else 


        if (field.type == 'checkbox') {
            str += '<div class="checkbox '+field.class+'">'+"\n";
            str += '<label>'+"\n";
            str += '<input type="checkbox" id="'+field.name+'" name="'+field.name+'"';;
            if (field.disabled) str += ' disabled="disabled"'
            if (field.value) str += ' checked="checked"'
            str += '> '+field.text+"\n";
            str += '</label>'+"\n";
            str += '</div>'+"\n";
        } else 


        if (field.type == 'image') {
            if (field.url) {
                str += '<div class="preview-wrapper">'+"\n";
                str += '<input type="hidden" class="state" name="'+field.name+'__state" value="" />'+"\n";
                if (field.preview !== false) {
                    str += '<img src="'+field.url+'" class="img-rounded preview preview-show '+field.class+'" />'+"\n";
                } else {
                    str += '<img src="'+field.url+'" class="img-rounded preview '+field.class+'" />'+"\n";
                }
                str += '<div class="feedback"></div>'+"\n";
                if (field.change !== false) str += '<button type="button" class="btn btn-info change">Change</button>'+"\n";
                if (field.delete !== false) str += '<button type="button" class="btn btn-danger delete">Delete</button>'+"\n";
                if (field.delete !== false) str += '<button type="button" class="btn btn-warning hidden restore">Restore</button>'+"\n";
//                    str += '<input type="hidden" name="'+field.name+'" value="'+field.value+'" data-original="'+field.value+'" />'+"\n";
                if (field.change !== false) {
                    str += '<input type="file" class="form-control hidden" id="'+field.name+'_newfile" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
                    if (field.disabled) str += ' disabled="disabled"'
                    str += '>'+"\n";
                }
                str += '</div>'+"\n";
            } else {
                str += '<input type="file" class="form-control';
                str += '" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
                if (field.disabled) str += ' disabled="disabled"'
                str += '>'+"\n";
            }
        } else

        
        if (field.type == 'textarea') {
            str += '<textarea class="form-control '+field.class;
            str += '" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" ';
            if (field.disabled) str += ' disabled="disabled"'
            var rows = (field.rows || this.form.default.rows || 6);
            str += ' rows="'+rows+'"';
            str += '>';
            str += field.value+'</textarea>'+"\n";
        } else 


        if (field.type == 'radio') {
            for (var t=0; t<field.options.length; t++) {
                str += '<label class="radio-inline '+field.class+'">'+"\n";
                // <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                var arr = field.options[t].split('|');
                var value = arr[0];
                if (arr[1]) {
                    var text = arr[1];
                } else {
                    var text = value;
                }
                if (value == field.value) {
                    selected = 'checked';
                } else {
                    selected = '';
                }
                str += '<input type="radio" name="'+field.name+'" id="'+field.name+'" value="'+value+'"';
                if (selected) str += ' '+selected;
                if (field.change) str += ' ng-change="'+field.change+'"'
                if (field.disabled) str += ' disabled="disabled"'
                str += '>'+"\n";
                str += text;
                str += '</label>'+"\n";
            }
        } else 

        if (field.type == 'button') {
            str += '<button class="btn ';
            str += field.class;
            str += '" id="'+field.name+'" name="'+field.name+'" ';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>';
            str += field.value+'</button>'+"\n";
        } else 

        if (field.type == 'select') {
            str += '<select class="form-control '+field.class+'" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'"';
            if (field.multiple) str += ' multiple'
            if (field.disabled) str += ' disabled'
            if (field.rows) str += ' size="'+field.rows+'"'
            str += '> '+field.label+"\n";
            if (field.options) {
                var selected = '';
                for (var u=0; u<field.options.length; u++) {
                    var arr = field.options[u].split('|');
                    if (arr.length == 1) {
                        
                        if (field.value == field.options[u] || field.value.indexOf(field.options[u]) != -1) {
                            selected = 'selected';
                        } else {
                            selected = '';
                        }
                        str += '<option value="'+field.options[u]+'" '+selected+'>'+field.options[u]+'</option>'+"\n";
                    } else {
                        if (field.value == arr[0] || field.value.indexOf(arr[0]) != -1) {
                            selected = 'selected';
                        } else {
                            selected = '';
                        }
                        str += '<option value="'+arr[0]+'" '+selected+'>'+arr[1]+'</option>'+"\n";
                    }
                }
            }
            str += '</select>'+"\n";
        }

    } else if (Object.prototype.toString.call(field) === '[object Array]') {
        for (var t=0; t<field.length; t++) {
            str += this.renderInput(field[t]);
        }
    }

    return str;
};

BootstrapFormz.prototype.defineField = function(field) {
    field = {
        init: function() {

        },
        renderField: function() {

        },
        renderInput: function() {

        }
    }
};

BootstrapFormz.prototype.renderField = function(field) {
    
    var required_html = '';
    var str = '';
    var selected = '';
    var columns = (field.columns || this.form.default.columns || ['col-sm-4', 'col-sm-8']);


    if (field.type) {

        field.name = field.name || '';
        field.label = field.label || '';
        field.value = field.value || '';
        field.class = field.class || '';
        field.required = field.required || false;
        field.placeholder = field.placeholder || '';


        if (field.type == 'currency') {
            field.symbol = field.symbol || '€';
            str += this.renderInput({
                    type: 'label', 
                    value: field.label, 
                    class: 'control-label '+columns[0],
                    required: field.required
                });
            str += this.renderCell(columns[1], field);
        } else 


        if (field.type == 'text' || field.type == 'password' || field.type == 'file' 
            || field.type == 'tag' || field.type == 'image' || field.type == 'radio'
            || field.type == 'select' || field.type == 'button') {
            str += this.renderInput({
                    type: 'label',
                    name: field.name,
                    value: field.label, 
                    class: 'control-label '+columns[0],
                    required: field.required
                });
            str += this.renderCell(columns[1], field);
        } else 

        
        if (field.type == 'checkbox') {
            field.text = field.text || '';

            str += this.renderInput({
                    type: 'label',
                    name: field.name,
                    value: field.label, 
                    class: 'control-label '+columns[0],
                    required: field.required
                });
            str += this.renderCell(columns[1], field);
        } else 


        if (field.type == 'textarea') {
            field.rows = field.rows || this.form.default.rows || 6;

            str += this.renderInput({
                    type: 'label',
                    name: field.name,
                    value: field.label, 
                    class: 'control-label '+columns[0],
                    required: field.required
                });
            str += this.renderCell(columns[1], field);
        } else 


        if (field.type == 'empty') {
        
        } else 


        if (field.type == 'group') {

            if (field.list) {
                if (typeof field.columns == 'string') {
                    str += this.renderCell(field.columns, field.list);
                } else {
                    for (var t=0; t<field.list.length; t++) {
                        if (field.columns) {
                            var col = field.columns[t] || '';
                        } else {
                            var col = '';
                        }
                        str += this.renderCell(col, field.list[t]);
                    }
                }
            }
        } else 


        if (field.type == 'hidden') {
            field.name = field.name || '';
            field.value = field.value || '';

            str += '<input type="hidden" class="hidden" id="'+field.name+'" name="'+field.name+'" value="'+field.value+'"';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>'+"\n";
        } else 


        if (field.type == 'email') {
            field.symbol = field.symbol || '@';

            str += this.renderInput({
                    type: 'label',
                    name: field.name,
                    value: field.label, 
                    class: 'control-label '+columns[0],
                    required: field.required
                });
            str += this.renderCell(columns[1], field);
        } else 


        if (field.type == 'html') {
            str += field.html+"\n";
        }


    }

    return str;
};




BootstrapFormz.prototype.renderFields = function(fields) {
    var str = '';
    for (var t=0; t<fields.length; t++) {
        var field = fields[t];
        if (field.type != 'html' && field.type != 'hidden') 
        {
            str += '<div class="form-group ';
            if (field.autocomplete) str += 'has-feedback';
            str += '">'+"\n";
        }
        str += this.renderField(field)+"\n";
        if (field.type != 'html' && field.type != 'hidden') str += '</div>'+"\n";
    }

    return str;
};



BootstrapFormz.prototype.render = function() {
    
    document.formz = {};

    var str = '';
    this.form.name = this.form.name || 'form_'+this.randomString(16);
    this.form.class = this.form.class || 'form-horizontal';
    this.form.method = this.form.method || 'post';
    this.form.enctype = this.form.enctype || 'multipart/form-data';

    str += '<form name="'+this.form.name+'" method="'+this.form.method+'" enctype="'+this.form.enctype+'" class="'+this.form.class+'" ';
    if (this.form.action) str += 'action="'+this.form.action+'" ';
    str += '>'+"\n";

    str += this.renderFields(this.form.fields, this.form);

    str += '</form>'+"\n";

    return str;
};




BootstrapFormz.prototype.ready = function() {

    /////////////////////////////////////////////////////////////////////
    // autocomplete
    
    var inputs = $(".autocomplete");

    for (var t=0; t<inputs.length; t++) {
        var name = $(inputs[t]).attr('name');
        if (document && document.formz && document.formz.data && document.formz.data[name]) {
            $(inputs[t]).typeahead({
                source: document.formz.data[name],
                autoSelect: true
            });
            
        } 
    }

    /////////////////////////////////////////////////////////////////////
    // image
    
    var divs = $(".preview-wrapper");


    function image_show(img) {

        if (!img) {
            $('.image-show-preview').remove();
            return;
        }

        var s = '<div class="image-show-preview">' 
            + '<div class="content">'
            + '<div class="close"></div>'
            + '<div class="image"><center><img src="'+$(img).attr('src')+'" /></center></div>'
            +'</div>'
            + '<div class="overlay"></div>'
            + '</div>';
        $(document).find('body').append(s);

        $('.image-show-preview').click(function() {
            image_show(false);
        });
    }

    function image_state(div, state, b) {
        if (b) {
            $(div).parent().find('input.state').val(state);
        } else {
            $(div).parent().find('input.state').val('');
        }

        if (b) {
            $(div).parent().find('input.image_state').val(state);
        } else {
            $(div).parent().find('input.image_state').val('');
        }
        if (state == 'change') {
            $(div).parent().removeClass('deleted');
            $(div).parent().find('button.delete').removeClass('hidden');
            $(div).parent().find('button.restore').addClass('hidden');

            if (b) {
                $(div).parent().find('input[type=file]').removeClass('hidden');
            } else {
                var input = $(div).parent().find('input[type=file]');
                $(input).attr('value', '');
                $(input).attr('type', '');
                $(input).attr('type', 'file');
                $(input).addClass('hidden');
            }
        } else if (state == 'delete') {
            var input = $(div).parent().find('input[type=file]');
            $(input).attr('value', '');
            $(input).attr('type', '');
            $(input).attr('type', 'file');
            $(input).addClass('hidden');

            if (b) {
                $(div).parent().addClass('deleted');
                $(div).parent().find('button.restore').removeClass('hidden');
                $(div).parent().find('button.delete').addClass('hidden');
            } else {
                $(div).parent().removeClass('deleted');
                $(div).parent().find('button.delete').removeClass('hidden');
                $(div).parent().find('button.restore').addClass('hidden');
            }
        }
    }

    for (var t=0; t<divs.length; t++) {
        //var name = $(inputs[t]).attr('name');
        $(divs[t]).find('button.change').click(function(event) {
            if ($(event.target).parent().find('input[type=file]').hasClass('hidden')) {
                image_state($(event.target), 'change', true);
            } else {
                image_state($(event.target), 'change', false);
            }
        });

        $(divs[t]).find('button.delete').click(function(event) {
            image_state($(event.target), 'delete', true);
        });

        $(divs[t]).find('button.restore').click(function(event) {
            image_state($(event.target), 'delete', false);
        });

        $(divs[t]).find('img.preview-show').click(function(event) {
            image_show(event.target);
        });
    }


    /////////////////////////////////////////////////////////////////////
    // currency

    var inputs = $(".currency");

    for (var t=0; t<inputs.length; t++) {
        var name = $(inputs[t]).attr('name');
        $(inputs[t]).change(function() {
            currency_validate(this);
        });
        currency_validate(inputs[t]);
    }

    function currency_validate(input) {
        var value = $(input).val()+'';
        value = value.replace(/\s/gm,'').replace(/[a-zA-Z]/gm,'').replace(/\,/gm,'.');
        if (value.indexOf('.') == -1) value += '.';
        value += '00';
        value = parseFloat(value).toFixed(2);
        $(input).val(value);
    }


    /////////////////////////////////////////////////////////////////////
    // input 

    $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();


};

