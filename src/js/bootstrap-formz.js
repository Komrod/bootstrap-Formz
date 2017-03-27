   


function BootstrapFormz(form) {
    this.types = {};
    this.form = form;
    var core = this;
    this.default = {
        columns: ['col-sm-5', 'col-sm-7'],
        rows: 6,
        name: 'form_'+this.randomString(16),
        class: 'form-horizontal',
        enctype: 'multipart/form-data',
        method: 'post'
    };

    this.defineDefaultFields();

    document.addEventListener("DOMContentLoaded", function(event) {
        setTimeout(function() {
            core.ready(event);
        }, 1);
    });
}



BootstrapFormz.prototype.defineDefaultFields = function() {

    this.defineField('text', {
        renderInput: function() {
            var str = "";
            str += "<input type=\"text\" class=\"form-control "+this.class;
            str += "\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
            if (this.disabled) str += " disabled"
            str += ">\n";
            return str;
        }
    });

    this.defineField('password', {
        renderInput: function() {
            var str = "";
            str += "<input type=\"password\" class=\"form-control "+this.class;
            str += "\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
            if (this.disabled) str += " disabled"
            str += ">\n";
            return str;
        }
    });

    this.defineField('file', {
        renderInput: function() {
            var str = "";
            str += "<input type=\"file\" class=\"form-control "+this.class;
            str += "\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
            if (this.disabled) str += " disabled"
            str += ">\n";
            return str;
        }
    });

    this.defineField('select', {
        renderInput: function() {
            var str = "";
            str += "<select class=\"form-control "+this.class+"\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\"";
            if (this.multiple) str += " multiple"
            if (this.disabled) str += " disabled"
            if (this.rows) str += ' size="'+this.rows+'"'
            str += ">\n";
            if (this.options) {
                var selected = "";
                for (var u=0; u<this.options.length; u++) {
                    var arr = this.options[u].split('|');
                    if (arr.length == 1) {
                        if (this.value == this.options[u] || this.value.indexOf(this.options[u]) != -1) {
                            selected = "selected";
                        } else {
                            selected = "";
                        }
                        str += "<option value=\""+this.options[u]+"\" "+selected+">"+this.options[u]+"</option>\n";
                    } else {
                        if (this.value == arr[0] || this.value.indexOf(arr[0]) != -1) {
                            selected = "selected";
                        } else {
                            selected = "";
                        }
                        str += "<option value=\""+arr[0]+"\" "+selected+">"+arr[1]+"</option>\n";
                    }
                }
            }
            str += "</select>\n";

            return str;
        }
    });

    this.defineField('radio', {
        renderInput: function() {
            var str = "";
            if (this.core.isString(this.options)) {
                this.options = [this.options];
            }
            for (var t=0; t<this.options.length; t++) {
                str += "<label class=\"radio-inline "+this.class+"\">\n";
                var arr = this.options[t].split('|');
                var value = arr[0];
                if (arr[1]) {
                    var text = arr[1];
                } else {
                    var text = value;
                }
                if (value == this.value) {
                    selected = 'checked';
                } else {
                    selected = '';
                }
                str += "<input type=\"radio\" name=\""+this.name+"\" id=\""+this.name+"\" value=\""+value+"\"";
                if (selected) str += " "+selected;
                if (this.disabled) str += " disabled"
                str += ">\n";
                str += text;
                str += "</label>\n";
            }

            return str;
        }
    });

    this.defineField('checkbox', {
        init: function() {
            this.label = this.label || "";
            this.class = this.class || "";
            this.required = this.required || false;
            this.name = this.name || 'field_text_'+this.core.randomString(16);
            this.value = this.value || this.default || "";
            this.placeholder = this.placeholder || "";
            this.text = this.text || "";
        },
        renderInput: function() {
            var str = "";
            if (this.options) {
                for (var t=0; t<this.options.length; t++) {
                    var value = this.options[t];
                    var text = this.options[t];
                    var arr = value.split("|");
                    if (arr.length>1) {
                        value = arr[0];
                        text = arr[1];
                    }
                    str += "<div class=\"checkbox "+this.class+"\">\n";
                    str += "<label>\n";
                    str += "<input type=\"checkbox\" id=\""+this.name+"-"+value+"\" name=\""+this.name+"[]\" value=\""+value+"\"";
                    if (this.disabled) str += " disabled";
console.log(value, this.value, this.value.indexOf(value));
                    if (this.value == value || (this.core.isArray(this.value) && this.value.indexOf(value) >= 0)) {
                        str += " checked";
                    }
                    str += "> "+text+"\n";
                    str += "</label>\n";
                    str += "</div>\n";
                }
            } else {
                str += "<div class=\"checkbox "+this.class+"\">\n";
                str += "<label>\n";
                str += "<input type=\"checkbox\" id=\""+this.name+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
                if (this.disabled) str += " disabled";
                if (this.checked) str += " checked";
                str += "> "+this.text+"\n";
                str += "</label>\n";
                str += "</div>\n";
            }
            return str;
        }
    });

    this.defineField('textarea', {
        renderInput: function() {
            var str = "";

            str += "<textarea class=\"form-control "+this.class+"\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" ";
            if (this.disabled) str += " disabled";
            var rows = (this.rows || this.core.default.rows || 6);
            str += " rows=\""+rows+"\"";
            str += ">";
            str += this.value+"</textarea>\n";

            return str;
        }
    });

    this.defineField('button', {
        renderInput: function() {
            var str = "";

            str += "<button class=\"btn "+this.class+"\" id=\""+this.name+"\" name=\""+this.name+"\" ";
            if (this.disabled) str += " disabled";
            str += ">";
            str += this.value+"</button>"+"\n";

            return str;
        }
    });

    this.defineField('email', {
        init: function() {
            this.label = this.label || "";
            this.class = this.class || "";
            this.required = this.required || false;
            this.name = this.name || 'field_text_'+this.core.randomString(16);
            this.value = this.value || this.default || "";
            this.placeholder = this.placeholder || "";
            this.symbol = this.symbol || "@";
        },
        renderInput: function() {
            var str = "";

            str += "<div class=\"input-group\">\n";
            str += "<div class=\"input-group-addon\">"+this.symbol+"</div>\n";
            str += "<input type=\"text\" class=\"form-control email "+this.class+"\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
            if (this.disabled) str += " disabled";
            str += ">\n";
            str += "</div>\n";

            return str;
        },
        onChange: function(event) {
            if (event.target) {
                var value = event.target.value+'';
                if (value == "") {
                    var parent = event.target.parentNode;
                    this.core.removeClass(parent, 'has-error')
                        .removeClass(parent, 'has-success');
                    return;
                }
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var parent = event.target.parentNode;
                if (!re.test(value)) {
                    this.core.addClass(parent, 'has-error')
                        .removeClass(parent, 'has-success');
                } else {
                    this.core.removeClass(parent, 'has-error')
                        .addClass(parent, 'has-success');
                }
            }
        },
        ready: function() {
            var input = document.getElementById(this.name);
            var field = this;
            this.onChange({target: input});
            input.addEventListener('change', function()
            {
                field.onChange({target: this});
            });
        }
    });

    this.defineField('currency', {
        init: function() {
            this.label = this.label || "";
            this.class = this.class || "";
            this.required = this.required || false;
            this.name = this.name || 'field_text_'+this.core.randomString(16);
            this.value = this.value || this.default || "";
            this.placeholder = this.placeholder || "";
            this.symbol = this.symbol || "$";
        },
        renderInput: function() {
            var str = "";

            str += "<div class=\"input-group\">\n";
            str += "<div class=\"input-group-addon\">"+this.symbol+"</div>\n";
            str += "<input type=\"text\" class=\"form-control currency "+this.class+"\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
            if (this.disabled) str += " disabled";
            str += ">\n";
            str += "</div>\n";

            return str;
        },
        onChange: function(event) {
            if (event.target) {
                var value = event.target.value+'';
                value = value.replace(/\s/gm,'').replace(/[a-zA-Z]/gm,'').replace(/\,/gm,'.');
                if (value.indexOf('.') == -1) value += '.';
                value += '00';
                value = parseFloat(value).toFixed(2);
                event.target.value = value;
            }
        },
        ready: function() {
            var input = document.getElementById(this.name);
            var field = this;
            this.onChange({target: input});
            input.addEventListener('change', function()
            {
                field.onChange({target: this});
            });
        }
    });

    this.defineField('label', {
        renderField: function() {
            return this.renderInput();
        },
        renderCell: function(cssClass) {
            this.class = cssClass + ' ' + this.class;
            return this.renderInput();
        },
        renderInput: function() {
            var str = "";
            str += "<label for=\""+this.name+"\" class=\""+this.class+"\">"+this.value;
            if (this.required) str += "<span class=\"required\">*</span>";
            str += "</label>\n";
            return str;
        }
    });

    this.defineField('inline', {
        init: function() {
            this.class = this.class || "";
            this.required = this.required || false;
            this.name = this.name || 'field_text_'+this.core.randomString(16);
        },
        renderField: function() {
            var str = "";
            if (this.label) {
                str += "<div class=\"form-group inline\">";
                str += this.core.renderLabel(this);
                str += this.renderCell(this.core.getColumn(this, 1));
                str += "</div>";
            } else {
                str += "<div class=\"form-group inline\">";
                str += this.renderCell(this.core.getColumn(this, 0));
                str += "</div>";
            }
            
            return str;
        },
        renderInput: function() {
            var str = "";

            if (this.list) {
                for (var t=0; t<this.list.length; t++) {
                    this.list[t] = this.core.createField(this.list[t]);
                    str += this.list[t].renderInput();
                }
            }

            return str;
        }
    });

    this.defineField('cell', {
        renderField: function() {
            var str = "";
            str += "<div class=\"form-group\">";
            str += this.renderInput();
            str += "</div>";
            return str;
        },
        renderInput: function() {
            var str = "";

            if (this.list) {
                for (var t=0; t<this.list.length; t++) {
                    this.list[t] = this.core.createField(this.list[t]);
                    str += this.list[t].renderCell(this.core.getColumn(this, t));
                }
            }

            return str;
        }
    });


    this.defineField('image', {
        renderInput: function() {
            var str = "";

            if (this.url) {
                str += "<div class=\"field-type-image field-name-"+this.name+"\">\n";
                str += "<div class=\"col-sm-8\">\n";
                if (this.preview !== false) {
                    str += "<img src=\""+this.url+"\" class=\"img-rounded preview preview-show "+this.class+"\" />\n";
                } else {
                    str += "<img src=\""+this.url+"\" class=\"img-rounded preview "+this.class+"\" />\n";
                }
                str += "<div class=\"feedback\"></div>\n";
                str += "</div>\n";
                str += "<div class=\"col-sm-4\">\n";
                str += "<input type=\"hidden\" class=\"state\" name=\""+this.name+"__state\" value=\"\" />\n";
                if (this.change !== false) {
                    str += "<button type=\"button\" class=\"btn btn-info change\">Change</button>\n";
                }
                if (this.delete !== false) {
                    str += "<button type=\"button\" class=\"btn btn-danger delete\">Delete</button>\n";
                    str += "<button type=\"button\" class=\"btn btn-warning hidden restore\">Restore</button>\n";
                }
                str += "</div>\n";
                if (this.change !== false) {
                    str += "<input type=\"file\" class=\"form-control hidden col-sm-12\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
                    if (this.disabled) str += " disabled";
                    str += ">\n";
                }
                str += "</div>\n";
            } else {
                str += "<input type=\"file\" class=\"form-control\" id=\""+this.name+"\" placeholder=\""+this.placeholder+"\" name=\""+this.name+"\" value=\""+this.value+"\"";
                if (this.disabled) str += " disabled";
                str += ">\n";
            }

            return str;
        },
        change_click: function(event) {
            var div = document.querySelector(".field-name-"+this.field.name);
            var btn_change = document.querySelector(".field-name-"+this.field.name+" button.change");
            var btn_delete = document.querySelector(".field-name-"+this.field.name+" button.delete");
            var btn_restore = document.querySelector(".field-name-"+this.field.name+" button.restore");
            var state = document.querySelector(".field-name-"+this.field.name+" .state");
            var input = document.getElementById(this.field.name);

            if (this.field.core.hasClass(input, "hidden")) {
                this.field.core.removeClass(div, 'deleted');
                this.field.core.removeClass(input, "hidden");
                this.field.core.addClass(btn_restore, 'hidden');
                this.field.core.removeClass(btn_delete, 'hidden');
                state.value = "changed";
                input.value = "";
            } else {
                this.field.core.removeClass(div, 'deleted');
                this.field.core.addClass(input, "hidden");
                this.field.core.addClass(btn_restore, 'hidden');
                this.field.core.removeClass(btn_delete, 'hidden');
                state.value = "";
                input.value = "";
            }
        },
        restore_click: function() {
            var div = document.querySelector(".field-name-"+this.field.name);
            var btn_change = document.querySelector(".field-name-"+this.field.name+" button.change");
            var btn_delete = document.querySelector(".field-name-"+this.field.name+" button.delete");
            var btn_restore = document.querySelector(".field-name-"+this.field.name+" button.restore");
            var state = document.querySelector(".field-name-"+this.field.name+" .state");
            var input = document.getElementById(this.field.name);

            this.field.core.removeClass(div, 'deleted');
            this.field.core.addClass(btn_restore, 'hidden');
            this.field.core.removeClass(btn_delete, 'hidden');
            this.field.core.addClass(input, "hidden");
            state.value = "";
            input.value = "";
        },
        delete_click: function() {
            var div = document.querySelector(".field-name-"+this.field.name);
            var btn_change = document.querySelector(".field-name-"+this.field.name+" button.change");
            var btn_delete = document.querySelector(".field-name-"+this.field.name+" button.delete");
            var btn_restore = document.querySelector(".field-name-"+this.field.name+" button.restore");
            var state = document.querySelector(".field-name-"+this.field.name+" .state");
            var input = document.getElementById(this.field.name);

            this.field.core.addClass(div, 'deleted');
            this.field.core.removeClass(btn_restore, 'hidden');
            this.field.core.addClass(btn_delete, 'hidden');
            this.field.core.addClass(input, "hidden");
            state.value = "deleted";
            input.value = "";
        },
        preview_click: function(event) {
            var html = "<div class=\"content\">"
                + "<div class=\"close\"></div>"
                + "<div class=\"image\"><center><img src=\""+event.target.src+"\" /></center></div>"
                + "</div>"
                + "<div class=\"overlay\"></div>";

            var div = document.createElement('div');
            div.className = "image-preview-overlay";
            div.innerHTML = html;
            document.body.appendChild(div);

            document.querySelector(".image-preview-overlay").addEventListener("click", function() {
                var element = document.querySelector(".image-preview-overlay");
                element.parentNode.removeChild(element);
            });
        },
        ready: function() {
            var btn_change = document.querySelector(".field-name-"+this.name+" button.change");
            var btn_delete = document.querySelector(".field-name-"+this.name+" button.delete");
            var btn_restore = document.querySelector(".field-name-"+this.name+" button.restore");
            var img = document.querySelector(".field-name-"+this.name+" img.preview-show");

            if (img) {
                img.field = this;
                img.removeEventListener("click", this.preview_click);
                img.addEventListener("click", this.preview_click);
            }
            if (btn_change) {
                btn_change.field = this;
                btn_change.removeEventListener("click", this.change_click);
                btn_change.addEventListener("click", this.change_click);
            }
            if (btn_restore) {
                btn_restore.field = this;
                btn_restore.removeEventListener("click", this.restore_click);
                btn_restore.addEventListener("click", this.restore_click);
            }
            if (btn_delete) {
                btn_delete.field = this;
                btn_delete.removeEventListener("click", this.delete_click);
                btn_delete.addEventListener("click", this.delete_click);
            }
        }
    });




};

BootstrapFormz.prototype.defaultFieldFunctions = function(field) {
    if (!field.init) {
        field.init = function() {
            this.label = this.label || "";
            this.class = this.class || "";
            this.required = this.required || false;
            this.name = this.name || 'field_text_'+this.core.randomString(16);
            this.value = this.value || this.default || "";
            this.placeholder = this.placeholder || "";
        };
    }
    if (!field.renderField) {
        field.renderField = function() {
            var str = "";
            str += "<div class=\"form-group\">";
            str += this.core.renderLabel(this);
            str += this.renderCell(this.core.getColumn(this, 1));
            str += "</div>";
            return str;
        };
    }
    if (!field.renderCell) {
        field.renderCell = function(cssClass) {
            var str = "";
            str += "<div class=\""+cssClass+"\">\n";
            str += this.renderInput();
            str += "</div>\n";
            return str;
        };
    }
    if (!field.renderInput) {
        field.renderInput = function() {
            return "";
        };
    }
    if (!field.ready) {
        field.ready = function() {
        };
    }

    return field;
}




BootstrapFormz.prototype.defineField = function(name, field) {
    var core = this;

    // defines the class
    this.types[name] = function() {
        this.form = core.form;
        this.core = core;
    };

    // define prototype
    this.defaultFieldFunctions(field);
    this.types[name].prototype = field;
};


BootstrapFormz.prototype.createField = function(object) {
    
    if (!object.type || !this.types || !this.types[object.type]) {
        return false;
    }

    var field = new this.types[object.type]();
    for (var name in object) {
        field[name] = object[name];
    }
    if (field.init) field.init();
    field.isInitiated = true;

    return field;
};



/*************************************************************
    Render functions
*************************************************************/


BootstrapFormz.prototype.render = function() {
    
    document.formz = {};

    var str = '';
    this.form.name = this.form.name || this.default.name;
    this.form.class = this.form.class || this.default.class;
    this.form.method = this.form.method || this.default.method;
    this.form.enctype = this.form.enctype || this.default.enctype;
    this.form.fields = this.form.fields || [];
    this.form.columns = this.form.columns || this.default.columns;

    str += '<form name="'+this.form.name+'" method="'+this.form.method+'" enctype="'+this.form.enctype+'" class="'+this.form.class+'" ';
    if (this.form.action) str += 'action="'+this.form.action+'" ';
    str += '>'+"\n";

    if (this.form, this.form.fields) {
        for (var t=0; t<this.form.fields.length; t++) {
            if (this.form.fields[t]) {
                if (!this.form.fields[t].type) this.form.fields[t].type = "text";
                this.form.fields[t] = this.createField(this.form.fields[t]);
                str += this.renderField(this.form.fields[t]);
            }
        }
    }

    str += '</form>'+"\n";

    return str;
};


BootstrapFormz.prototype.renderLabel = function(field) {
    var object = {};
    object.type = "label";
    object.value = field.label || "";
    object.name = field.name || "";
    object.class = this.getColumn(field, 0)+" control-label";

    return this.renderInput(object);
};


BootstrapFormz.prototype.renderField = function(field) {
    
    var str = "";
    if (field) {
        str += field.renderField();
    }
    return str;
};





BootstrapFormz.prototype.renderInput = function(field) {
    var str = '';
    if (!field.isInitiated) {
        field = this.createField(field);
    }
    str += field.renderInput();
    return str;

/*    


        if (field.type == 'tag') {
            str += '<input type="'+field.type+'" data-role="tagsinput" class="form-control '+field.class;
            str += '" id="'+field.name+'" placeholder="'+field.placeholder+'" name="'+field.name+'" value="'+field.value+'"';
            if (field.disabled) str += ' disabled="disabled"'
            str += '>'+"\n";
        } else 


      
    } else if (Object.prototype.toString.call(field) === '[object Array]') {
        for (var t=0; t<field.length; t++) {
            str += this.renderInput(field[t]);
        }
    }

    return str;
*/
};



/*************************************************************
    General functions
*************************************************************/


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


BootstrapFormz.prototype.isString = function(object) {
    return (typeof object === "string");
};


BootstrapFormz.prototype.isArray = function(object) {
    return Object.prototype.toString.call(object) === "[object Array]";
};


BootstrapFormz.prototype.isObject = function(object) {
    return object !== null && typeof object === "object";
};


BootstrapFormz.prototype.getColumn = function(field, num) {
    if (field.columns && this.isString(field.columns)) return field.columns;
    if (field.columns && field.columns[num]) return field.columns[num];
    if (this.form && this.form.columns && this.form.columns[num]) return this.form.columns[num];
    if (this.default && this.default.columns && this.default.columns[num]) return this.default.columns[num];
    return '';
};


BootstrapFormz.prototype.xtrim = function(str) {
    return (str + '').replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
};


BootstrapFormz.prototype.hasClass = function(element, classname) {
    if (!element.className || !element.className.indexOf) return false;
    return element.className.indexOf(classname) != -1;
};


BootstrapFormz.prototype.addClass = function(element, classname) {
    if (!element.className) return this;
    if (this.hasClass(element, classname)) return this;
    element.className = this.xtrim(element.className+" "+classname);
    return this;
};


BootstrapFormz.prototype.removeClass = function(element, classname) {
    if (!element.className) return this;
    element.className = this.xtrim(element.className.replace(classname, ''));
    return this;
};



/*************************************************************
    General functions
*************************************************************/


BootstrapFormz.prototype.ready = function(event) {
    if (this.form && this.form.fields && this.form.fields.length) {
        for (var t=0; t<this.form.fields.length; t++) {
            var new_event = {
                target: event.target = document.getElementById(this.form.fields[t].name)
            };
            if (this.form.fields[t] && this.form.fields[t].ready) this.form.fields[t].ready(new_event);
        }
    }
/*
    $(function() {

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
        // input  tag

        //$("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();

    });
*/
};

