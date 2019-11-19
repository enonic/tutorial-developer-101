var randomGenBean = __.newBean('com.enonic.lib.mylib.RandomGeneratorHandler');

exports.randomBoolean = function () {
    var value = randomGenBean.randomBoolean();
    return __.toNativeObject(value);
};

exports.randomInteger = function (min, max) {
    var value = randomGenBean.randomInteger(min, max);
    return __.toNativeObject(value);
};

exports.randomNumber = function (min, max) {
    var value = randomGenBean.randomNumber(min, max);
    return __.toNativeObject(value);
};

exports.randomString = function (length) {
    var value = randomGenBean.randomString(length);
    return __.toNativeObject(value);
};

exports.createObject = function (text, array, object) {
    var bean = __.newBean('com.enonic.lib.mylib.ParameterPassingExampleHandler');
    bean.text = __.nullOrValue(text);
    bean.array = __.nullOrValue(array);
    bean.object = __.nullOrValue(object);

    return __.toNativeObject(bean.execute());
};
