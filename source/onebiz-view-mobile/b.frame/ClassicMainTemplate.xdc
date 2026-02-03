{
    "xdsVersion": "4.2.4",
    "frameworkVersion": "ext66",
    "internals": {
        "type": "Ext.container.Viewport",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "designer|initialView": true,
            "designer|userAlias": "mainview",
            "designer|userClassName": "MainView",
            "itemId": "mainView",
            "layout": "border"
        },
        "configAlternates": {
            "designer|initialView": "boolean",
            "designer|userAlias": "string",
            "designer|userClassName": "string",
            "itemId": "string",
            "layout": "string"
        },
        "cn": [
            {
                "type": "Ext.panel.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "height": 100,
                    "itemId": "headerPanel",
                    "layout|region": "north",
                    "title": "Header"
                },
                "configAlternates": {
                    "height": "auto",
                    "itemId": "string",
                    "layout|region": "string",
                    "title": "string"
                },
                "name": "MyPanel1"
            },
            {
                "type": "Ext.panel.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "collapseDirection": "left",
                    "itemId": "menuPanel",
                    "layout": "accordion",
                    "layout|collapseMode": null,
                    "layout|region": "west",
                    "layout|split": true,
                    "title": "Menu",
                    "width": 250
                },
                "configAlternates": {
                    "collapseDirection": "string",
                    "itemId": "string",
                    "layout": "string",
                    "layout|collapseMode": "string",
                    "layout|region": "string",
                    "layout|split": "boolean",
                    "title": "string",
                    "width": "auto"
                },
                "name": "MyPanel2",
                "cn": [
                    {
                        "type": "Ext.panel.Panel",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "itemId": null,
                            "title": "Group 1"
                        },
                        "configAlternates": {
                            "itemId": "string",
                            "title": "string"
                        },
                        "name": "MyPanel3",
                        "cn": [
                            {
                                "type": "Ext.menu.Menu",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "floating": false,
                                    "itemId": "menu1",
                                    "width": null
                                },
                                "configAlternates": {
                                    "floating": "boolean",
                                    "itemId": "string",
                                    "width": "auto"
                                },
                                "name": "MyMenu",
                                "cn": [
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem"
                                    },
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem1"
                                    },
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Ext.panel.Panel",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "title": "Group 2"
                        },
                        "configAlternates": {
                            "title": "string"
                        },
                        "name": "MyPanel4",
                        "cn": [
                            {
                                "type": "Ext.menu.Menu",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "floating": false,
                                    "itemId": "menu2",
                                    "width": null
                                },
                                "configAlternates": {
                                    "floating": "boolean",
                                    "itemId": "string",
                                    "width": "auto"
                                },
                                "name": "MyMenu1",
                                "cn": [
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem3"
                                    },
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem4"
                                    },
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem5"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Ext.panel.Panel",
                        "reference": {
                            "name": "items",
                            "type": "array"
                        },
                        "codeClass": null,
                        "userConfig": {
                            "title": "Group 3"
                        },
                        "configAlternates": {
                            "title": "string"
                        },
                        "name": "MyPanel5",
                        "cn": [
                            {
                                "type": "Ext.menu.Menu",
                                "reference": {
                                    "name": "items",
                                    "type": "array"
                                },
                                "codeClass": null,
                                "userConfig": {
                                    "floating": false,
                                    "itemId": "menu3",
                                    "width": null
                                },
                                "configAlternates": {
                                    "floating": "boolean",
                                    "itemId": "string",
                                    "width": "auto"
                                },
                                "name": "MyMenu2",
                                "cn": [
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem6"
                                    },
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem7"
                                    },
                                    {
                                        "type": "Ext.menu.Item",
                                        "reference": {
                                            "name": "items",
                                            "type": "array"
                                        },
                                        "codeClass": null,
                                        "userConfig": {
                                            "focusable": true,
                                            "text": "Menu Item"
                                        },
                                        "configAlternates": {
                                            "focusable": "boolean",
                                            "text": "string"
                                        },
                                        "name": "MyMenuItem8"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "Ext.panel.Panel",
                "reference": {
                    "name": "items",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "itemId": "contentPanel",
                    "layout|flex": 1,
                    "layout|region": "center",
                    "title": "Content"
                },
                "configAlternates": {
                    "itemId": "string",
                    "layout|flex": "number",
                    "layout|region": "string",
                    "title": "string"
                },
                "name": "MyPanel6"
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {},
    "viewController": {
        "xdsVersion": "4.2.4",
        "frameworkVersion": "ext66",
        "internals": {
            "type": "Ext.app.ViewController",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userAlias": "mainview",
                "designer|userClassName": "MainViewViewController"
            },
            "configAlternates": {
                "designer|userAlias": "string",
                "designer|userClassName": "string"
            }
        },
        "linkedNodes": {},
        "boundStores": {},
        "boundModels": {}
    },
    "viewModel": {
        "xdsVersion": "4.2.4",
        "frameworkVersion": "ext66",
        "internals": {
            "type": "Ext.app.ViewModel",
            "reference": {
                "name": "items",
                "type": "array"
            },
            "codeClass": null,
            "userConfig": {
                "designer|userAlias": "mainview",
                "designer|userClassName": "MainViewViewModel"
            },
            "configAlternates": {
                "designer|userAlias": "string",
                "designer|userClassName": "string"
            }
        },
        "linkedNodes": {},
        "boundStores": {},
        "boundModels": {}
    }
}