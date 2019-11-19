package com.enonic.lib.mylib;

import java.util.Map;

import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;

public final class ExampleObjectMapper
    implements MapSerializable
{
    private final String text;

    private final Object[] array;

    private final Map<String, Object> object;

    public ExampleObjectMapper( String text, Object[] array, Map<String, Object> object )
    {
        this.text = text;
        this.array = array;
        this.object = object;
    }

    @Override
    public void serialize( MapGenerator gen )
    {
        gen.value( "text", text );
        gen.array( "arrayValues" );
        for ( Object value : array )
        {
            gen.value( value );
        }
        gen.end();

        gen.map( "objectValues" );
        for ( String key : object.keySet() )
        {
            gen.value( key, object.get( key ) );
        }
        gen.end();
    }
}
