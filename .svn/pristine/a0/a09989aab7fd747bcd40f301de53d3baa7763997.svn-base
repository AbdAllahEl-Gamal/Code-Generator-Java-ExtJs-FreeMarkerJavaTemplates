Ext.define('Ext.ux.form.MultiFile', {
    extend: 'Ext.form.field.File',
    alias: 'widget.multifilefield',
 
    initComponent: function () {
        var me = this;
 
        me.on('render', function () {
            me.fileInputEl.set({ multiple: 'multiple' });
        });
 
        me.callParent(arguments);
    },
    onFileChange: function (button, e, value) {
        var me = this,
            upload = me.fileInputEl.dom,
            files = upload.files,
            names = [];
 
        if (files) {
            for (var i = 0; i < files.length; i++)
                names.push(files[i].name);
            value = names.join(', ');
        }
 
        me.callParent(arguments);
    }
});