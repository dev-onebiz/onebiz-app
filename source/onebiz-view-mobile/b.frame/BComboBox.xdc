{
    "xdsVersion": "4.2.4",
    "frameworkVersion": "modern66",
    "internals": {
        "type": "Ext.field.ComboBox",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "designer|userAlias": "bcombobox",
            "designer|userClassName": "BComboBox",
            "displayField": "text",
            "label": "Field",
            "name": "",
            "queryMode": "local",
            "store": [
                "{}"
            ],
            "valueField": "value"
        },
        "configAlternates": {
            "designer|userAlias": "string",
            "designer|userClassName": "string",
            "displayField": "datafield",
            "label": "string",
            "queryMode": "string",
            "valueField": "datafield",
            "store": "object",
            "name": "string"
        },
        "name": "MyComboBox1",
        "cn": [
            {
                "type": "fixedfunction",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "fn": "initialize",
                    "implHandler": [
                        "var me = this;",
                        "",
                        "if (me.code) {",
                        "    var code = me.code;",
                        "    var store = Ext.StoreMgr.get('CodeStore');",
                        "    var items = store.getData().items;",
                        "",
                        "    if (!me.defaultText) {",
                        "        me.defaultText = '- 선   택 -';",
                        "    }",
                        "",
                        "    var records = [{ text: me.defaultText, value: '' }];",
                        "    for (var i = 0, l = items.length; i < l; i++) {",
                        "        if (code == items[i].data.code) {",
                        "            var children = items[i].data.children;",
                        "            for (var j = 0, l2 = children.length; j < l2; j++) {",
                        "                var item = children[j];",
                        "                records.push({",
                        "                    code: item.code,",
                        "                    text: item.text,",
                        "                    value: item.value",
                        "                });",
                        "            }",
                        "            break;",
                        "        }",
                        "    }",
                        "",
                        "    var store = Ext.create('Ext.data.Store', {",
                        "        fields: ['text', 'value'],",
                        "        data : records",
                        "    });",
                        "",
                        "    me.setStore(store);",
                        "    if (!me.value && items.length > 0) {",
                        "        me.value = store.getAt(0).get('value');",
                        "    }",
                        "}",
                        "",
                        "me.callParent();"
                    ]
                },
                "configAlternates": {
                    "fn": "string",
                    "implHandler": "code"
                },
                "name": "initialize"
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {},
    "viewController": {
        "xdsVersion": "4.2.4",
        "frameworkVersion": "modern66",
        "internals": {
            "type": "Ext.app.ViewController",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userAlias": "bcombobox",
                "designer|userClassName": "BComboBoxViewController"
            },
            "configAlternates": {
                "designer|userAlias": "string",
                "designer|userClassName": "string"
            },
            "name": "MyComboBox1ViewController"
        },
        "linkedNodes": {},
        "boundStores": {},
        "boundModels": {}
    },
    "viewModel": {
        "xdsVersion": "4.2.4",
        "frameworkVersion": "modern66",
        "internals": {
            "type": "Ext.app.ViewModel",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userAlias": "bcombobox",
                "designer|userClassName": "BComboBoxViewModel"
            },
            "configAlternates": {
                "designer|userAlias": "string",
                "designer|userClassName": "string"
            },
            "name": "MyComboBox1ViewModel"
        },
        "linkedNodes": {},
        "boundStores": {},
        "boundModels": {}
    }
}