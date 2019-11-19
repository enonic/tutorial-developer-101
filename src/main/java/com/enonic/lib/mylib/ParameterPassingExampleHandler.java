package com.enonic.lib.mylib;

import java.util.HashMap;
import java.util.Map;

public final class ParameterPassingExampleHandler
{
    private String text;

    private Object[] array;

    private Map<String, Object> object;

    public ExampleObjectMapper execute()
    {
        String text = this.text == null ? "" : this.text;
        Object[] array = this.array == null ? new Object[0] : this.array;
        Map<String, Object> object = this.object == null ? new HashMap<>() : this.object;

        return new ExampleObjectMapper( text, array, object );
    }

    public void setText( final String text )
    {
        this.text = text;
    }

    public void setArray( final Object[] array )
    {
        this.array = array;
    }

    public void setObject( final Map<String, Object> object )
    {
        this.object = object;
    }
}
