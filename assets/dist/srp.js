System.register(["@main"],(function(t,e){"use strict";var i,s,n,a;e&&e.id;function r(t){return BigInt(`0x${t}`)}return{setters:[function(t){}],execute:function(){i={identitySelector:"[data-input-identity]",passwordSelector:"[data-input-password]",size:256,hasher:"sha256"},s=u.$http,n=class{constructor(t,e={}){this.el=t,this.options=e,this.submitting=!1,this.disabledInputs=[],this.options=Object.assign({},i,this.options),this.init()}init(){if(this.identityInput=this.el.querySelector(this.options.identitySelector),this.passwordInput=this.el.querySelector(this.options.passwordSelector),!this.identityInput||!this.passwordInput)throw new Error("Identity or password input not found.");this.el.addEventListener("submit",(async t=>{if(!this.submitting)return t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation(),await this.register(),this.disablePasswords(),this.submitting=!0,void this.el.requestSubmit()})),this.el.addEventListener("invalid",(()=>{this.release()}),!0)}release(){this.submitting=!1;for(const t of this.disabledInputs)t.disabled=!1}getPasswordInputs(){return[this.passwordInput,...this.el.querySelectorAll("[data-srp-override]")]}disablePasswords(){this.disabledInputs=[];for(const t of this.getPasswordInputs())t.value&&!t.disabled&&(t.disabled=!0,this.disabledInputs.push(t),setTimeout((()=>{t.disabled=!1}),1e3))}createClient(){const t=SRPClient.create(this.options.prime,this.options.generator,this.options.key);return t.setSize(this.options.size),t.setHasher(this.options?.hasher),t}async register(){const t=this.createClient(),e=this.identityInput.value,i=this.passwordInput.value;if(!e||!i)return this.getHiddenInput("srp[salt]").value="",void(this.getHiddenInput("srp[verifier]").value="");let{salt:s,verifier:n}=await t.register(e,i);this.getHiddenInput("srp[salt]").value=s.toString(16);this.getHiddenInput("srp[verifier]").value=n.toString(16)}getHiddenInput(t){return this.el.querySelector(`[name="${t}"]`)||this.createHiddenInput(t)}createHiddenInput(t){const e=document.createElement("input");return e.type="hidden",e.name=t,this.el.appendChild(e),e}},a=class{constructor(t,e={}){this.el=t,this.options=e,this.fallback=!1,this.submitting=!1,this.disabledInputs=[],this.options=Object.assign({},i,this.options),this.init()}init(){if(this.identityInput=this.el.querySelector(this.options.identitySelector),this.passwordInput=this.el.querySelector(this.options.passwordSelector),!this.identityInput||!this.passwordInput)throw new Error("Identity or password input not found.");this.el.addEventListener("submit",(async t=>{if(this.submitter=t.submitter,!this.submitting){t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation();try{await this.auth()}catch(t){console.warn(t)}return this.fallback||this.disablePasswords(),this.submitting=!0,void this.el.requestSubmit()}})),this.el.addEventListener("invalid",(()=>{this.release()}),!0)}release(){this.submitter&&(this.submitter.disabled=!1),this.submitting=!1,this.fallback=!1,this.getHiddenInput("srp[M2]").value="";for(const t of this.disabledInputs)t.disabled=!1}async auth(){if(!this.identityInput.value||!this.passwordInput.value)return;this.submitter&&(this.submitter.disabled=!0);const t=this.identityInput.value,e=this.passwordInput.value,i=this.createClient(),n=(await s.get("@auth_ajax/srpChallenge{?identity}",{vars:{identity:t}})).data.data;if(null==n)return;if(this.fallback=!!n.fallback,this.getHiddenInput("srp[fallback]").value=this.fallback?"1":"0",this.fallback)return;let{salt:a,B:o}=n;a=r(a),o=r(o);const d=await i.generateRandomSecret(),u=await i.generatePublic(d),h=await i.generatePasswordHash(a,t,e),l=await i.generateCommonSecret(u,o),p=await i.generatePreMasterSecret(d,o,h,l),c=await i.hash(p),g=await i.generateClientSessionProof(t,a,u,o,c),b=await s.post("@auth_ajax/srpAuthenticate",{identity:t,A:u.toString(16),M1:g.toString(16)}),{proof:I}=b.data.data,w=await i.generateServerSessionProof(u,g,c);w===r(I)&&(this.getHiddenInput("srp[M2]").value=w.toString(16))}getPasswordInputs(){return[this.passwordInput,...this.el.querySelectorAll("[data-srp-override]")]}disablePasswords(){this.disabledInputs=[];for(const t of this.getPasswordInputs())t.value&&!t.disabled&&(t.disabled=!0,this.disabledInputs.push(t),setTimeout((()=>{t.disabled=!1}),1e3))}createClient(){const t=SRPClient.create(this.options.prime,this.options.generator,this.options.key);return t.setSize(this.options.size),t.setHasher(this.options.hasher),t}getHiddenInput(t){return this.el.querySelector(`[name="${t}"]`)||this.createHiddenInput(t)}createHiddenInput(t){const e=document.createElement("input");return e.type="hidden",e.name=t,this.el.appendChild(e),e}},u.directive("srp-registration",{mounted(t,{value:e}){const i=JSON.parse(e);u.module(t,"srp.registration",(t=>new n(t,i)))}}),u.directive("srp-login",{mounted(t,{value:e}){const i=JSON.parse(e);u.module(t,"srp.registration",(t=>new a(t,i)))}})}}}));