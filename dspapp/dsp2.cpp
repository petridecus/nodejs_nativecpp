/* cppsrc/main.cpp */
#include <napi.h>
#include <thread>

Napi::Value GetAudio(const Napi::CallbackInfo &info)
{
    char buff[128];
    int  val = 0;

    Napi::Env env = info.Env();

    Napi::Function emit = info[0].As<Napi::Function>();
    emit.Call(  {Napi::String::New(env, "start")}  );

    while (true)
    {
        sprintf(buff, "audio data %d ...", ++val);

        emit.Call( { Napi::String::New(env, "sensor"),
                   Napi::String::New(env, buff ) } );
    }

    emit.Call( {Napi::String::New(env, "end")} );
    return Napi::String::New( env, "OK" );
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "getAudio"), Napi::Function::New(env, GetAudio));
    return exports;
}

NODE_API_MODULE(dsp, InitAll)