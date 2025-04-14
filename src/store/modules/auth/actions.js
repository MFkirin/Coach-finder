export default {
    async login(context, payload) {
       return context.dispatch('auth', {
        ...payload,
        mode: 'login'
       })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
           })
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN9qh4IRIgndDpqkeB485SyQZbr-RTfEs';
        
        if ( mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN9qh4IRIgndDpqkeB485SyQZbr-RTfEs';
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        });
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || ' Failed to authenticate');
            throw error;
        }

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.localId);
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
        });
    },
    tryLoggin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId ){
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        } 
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        })
    }
};