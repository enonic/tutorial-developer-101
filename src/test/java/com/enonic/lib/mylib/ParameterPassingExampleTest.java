package com.enonic.lib.mylib;

import com.enonic.xp.testing.ScriptRunnerSupport;

public class ParameterPassingExampleTest
    extends ScriptRunnerSupport
{
    @Override
    public String getScriptTestFile()
    {
        return "site/lib/parameter-passing-test.js";
    }

}
