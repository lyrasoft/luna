System.register(["@main"],(function(t,a){"use strict";a&&a.id;return{setters:[function(t){}],execute:async function(){await u.$validation.addGlobalValidator("account_check",(async(t,a,e)=>{const s=e.field||"username",c=await u.$http.get(u.route("@account_check",{field:s,value:t}));return c.data.data.exists?c.data.data.message||u.__("luna.message.user.account.exists"):""}))}}}));