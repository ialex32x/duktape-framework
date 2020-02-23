using System;

namespace Duktape
{
    public interface Invokable
    {
        void Invoke();
    }

    public class InvokableAction : Invokable
    {
        private Action _fn;

        public InvokableAction(Action fn)
        {
            _fn = fn;
        }

        public void Invoke()
        {
            try
            {
                _fn();
            }
            catch (Exception exception)
            {
                UnityEngine.Debug.LogError(exception);
            }
        }
    }
}