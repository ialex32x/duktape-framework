using System;
using System.Collections.Generic;
using AOT;

namespace Duktape
{
    using UnityEngine;

    // 处理类型
    public partial class DuktapeBinding
    {
        public static bool duk_get_type(IntPtr ctx, int idx, out Type o)
        {
            if (DuktapeDLL.duk_is_string(ctx, idx))
            {
                var name = DuktapeDLL.duk_get_string(ctx, idx);
                o = DuktapeAux.GetType(name);
                return o != null;
            }
            else
            {
                uint refid_t;
                //TODO: 增加一个隐藏属性记录jsobject对应类型 (constructor, object)
                if (DuktapeDLL.duk_unity_get_type_refid(ctx, idx, out refid_t))
                {
                    var vm = DuktapeVM.GetVM(ctx);
                    o = vm.GetExportedType(refid_t);
                    // Debug.Log($"get type from exported registry {o}:{refid}");
                    return o != null;
                }
                else
                {
                    int refid;
                    if (DuktapeDLL.duk_unity_get_refid(ctx, idx, out refid))
                    {
                        var cache = DuktapeVM.GetObjectCache(ctx);
                        cache.TryGetTypedObject(refid, out o);
                        // Debug.Log($"get type from objectcache registry {o}:{refid}");
                        return o != null;
                    }
                }
            }
            o = null;
            return false;
        }

        public static bool duk_get_type_array(IntPtr ctx, int idx, out Type[] o)
        {
            if (DuktapeDLL.duk_is_array(ctx, idx))
            {
                var length = DuktapeDLL.duk_unity_get_length(ctx, idx);
                var nidx = DuktapeDLL.duk_normalize_index(ctx, idx);
                o = new Type[length];
                for (var i = 0U; i < length; i++)
                {
                    DuktapeDLL.duk_get_prop_index(ctx, idx, i);
                    Type e;
                    duk_get_type(ctx, -1, out e);
                    o[i] = e;
                    DuktapeDLL.duk_pop(ctx);
                }
                return true;
            }
            duk_get_classvalue<Type[]>(ctx, idx, out o);
            return true;
        }
    }
}
