"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[560],{6560:(e,t,o)=>{o.r(t),o.d(t,{default:()=>B});var l=o(4061);const a={class:"form-group mb-3"},n=(0,l.createElementVNode)("label",{for:"input-addon-edit-title-text"},"Title",-1),d=(0,l.createElementVNode)("small",{class:"form-text text-muted"},"The main title of this section, keep empty to hide it.",-1),i=(0,l.createElementVNode)("hr",null,null,-1),r={class:"form-group mb-3"},c=(0,l.createElementVNode)("label",{for:"input-addon-edit-image"},"Image",-1),m={class:"form-group mb-3"},s=(0,l.createElementVNode)("label",{for:"input-addon-edit-link"},"Link",-1),u={key:1,class:"form-group mb-3"},p=(0,l.createElementVNode)("label",{for:"input-addon-edit-link-target"},"Open in New Window",-1),V={class:"form-group mb-3"},N=(0,l.createElementVNode)("label",{for:"input-addon-edit-alt"},"Alt Text",-1),x=(0,l.createElementVNode)("small",{class:"form-text text-muted"},"\n        The alt text if image unavailable, also good for SEO.\n      ",-1),g={class:"form-group mb-3"},v=(0,l.createElementVNode)("label",null,"\n        Border Radius\n      ",-1),f={class:"form-group mb-3"},k=(0,l.createElementVNode)("label",{for:"input-addon-edit-align"},"Image Alignment",-1),T={class:"mt-2"};var E=o(2425),b=o(4290),h=o(9898),w=o(7954),A=o(5700),C=o(4749);const U={name:"addon-image",components:{ButtonRadio:E.A,SliderInput:A.A,UnicornSwitcher:h.A,SingleImage:w.A,TitleOptions:C.A},props:{...b.A.props},setup(e,t){const o=(0,b.A)(e,t,{options:{image:"",border_radius:"",alt:"",link:"",link_target:""}});return{...(0,l.toRefs)(o)}}},B=(0,o(6262).A)(U,[["render",function(e,t,o,E,b,h){const w=(0,l.resolveComponent)("TitleOptions"),A=(0,l.resolveComponent)("SingleImage"),C=(0,l.resolveComponent)("UnicornSwitcher"),U=(0,l.resolveComponent)("SliderInput"),B=(0,l.resolveComponent)("ButtonRadio");return(0,l.openBlock)(),(0,l.createElementBlock)("div",null,[(0,l.createElementVNode)("div",a,[n,(0,l.createTextVNode)(),(0,l.withDirectives)((0,l.createElementVNode)("textarea",{id:"input-addon-edit-title-text","onUpdate:modelValue":t[0]||(t[0]=t=>e.options.title.text=t),class:"form-control"},null,512),[[l.vModelText,e.options.title.text]]),(0,l.createTextVNode)(),d]),(0,l.createTextVNode)(),""!==e.options.title.text?((0,l.openBlock)(),(0,l.createBlock)(w,{key:0,id:"input-addon-edit",modelValue:e.options,"onUpdate:modelValue":t[1]||(t[1]=t=>e.options=t)},null,8,["modelValue"])):(0,l.createCommentVNode)("",!0),(0,l.createTextVNode)(),i,(0,l.createTextVNode)(),(0,l.createElementVNode)("div",r,[c,(0,l.createTextVNode)(),(0,l.createVNode)(A,{modelValue:e.options.image,"onUpdate:modelValue":t[2]||(t[2]=t=>e.options.image=t),id:"input-addon-edit-image"},null,8,["modelValue"])]),(0,l.createTextVNode)(),(0,l.createElementVNode)("div",m,[s,(0,l.createTextVNode)(),(0,l.withDirectives)((0,l.createElementVNode)("input",{id:"input-addon-edit-link",type:"url","onUpdate:modelValue":t[3]||(t[3]=t=>e.options.link=t),class:"form-control"},null,512),[[l.vModelText,e.options.link]])]),(0,l.createTextVNode)(),""!==e.options.link?((0,l.openBlock)(),(0,l.createElementBlock)("div",u,[p,(0,l.createTextVNode)(),(0,l.createElementVNode)("div",null,[(0,l.createVNode)(C,{name:"addon-edit-link-target",modelValue:e.options.link_target,"onUpdate:modelValue":t[4]||(t[4]=t=>e.options.link_target=t),id:"input-addon-edit-link-target",shape:"circle",color:"success","true-value":"_blank","false-value":""},null,8,["modelValue"])])])):(0,l.createCommentVNode)("",!0),(0,l.createTextVNode)(),(0,l.createElementVNode)("div",V,[N,(0,l.createTextVNode)(),(0,l.withDirectives)((0,l.createElementVNode)("input",{id:"input-addon-edit-alt",type:"text","onUpdate:modelValue":t[5]||(t[5]=t=>e.options.alt=t),class:"form-control"},null,512),[[l.vModelText,e.options.alt]]),(0,l.createTextVNode)(),x]),(0,l.createTextVNode)(),(0,l.createElementVNode)("div",g,[v,(0,l.createTextVNode)(),(0,l.createVNode)(U,{modelValue:e.options.border_radius,"onUpdate:modelValue":t[6]||(t[6]=t=>e.options.border_radius=t),max:1200},null,8,["modelValue"])]),(0,l.createTextVNode)(),(0,l.createElementVNode)("div",f,[k,(0,l.createTextVNode)(),(0,l.createElementVNode)("div",T,[(0,l.createVNode)(B,{color:"primary",variant:"outline",class:"w-100",modelValue:e.options.align,"onUpdate:modelValue":t[7]||(t[7]=t=>e.options.align=t),options:[{text:"Default",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]},null,8,["modelValue"])])])])}]])}}]);
//# sourceMappingURL=../560.js.map