(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{622:function(e,l,a){"use strict";a.r(l);var c=a(1),t=Object(c.a)({},(function(){var e=this,l=e.$createElement,a=e._self._c||l;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-038-kvstore-state-listening"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-038-kvstore-state-listening"}},[e._v("#")]),e._v(" ADR 038: KVStore state listening")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("ul",[a("li",[e._v("11/23/2020: Initial draft")])]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("Proposed")]),e._v(" "),a("h2",{attrs:{id:"abstract"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),a("p",[e._v("This ADR defines a set of changes to enable listening to state changes of individual KVStores and exposing these data to consumers.")]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("Currently, KVStore data can be remotely accessed through "),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/docs/building-modules/messages-and-queries.md#queries",target:"_blank",rel:"noopener noreferrer"}},[e._v("Queries"),a("OutboundLink")],1),e._v("\nwhich proceed either through Tendermint and the ABCI, or through the gRPC server.\nIn addition to these request/response queries, it would be beneficial to have a means of listening to state changes as they occur in real time.")]),e._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),a("p",[e._v("We will modify the "),a("code",[e._v("MultiStore")]),e._v(" interface and its concrete ("),a("code",[e._v("rootmulti")]),e._v(" and "),a("code",[e._v("cachemulti")]),e._v(") implementations and introduce a new "),a("code",[e._v("listenkv.Store")]),e._v(" to allow listening to state changes in underlying KVStores.\nWe will introduce a plugin system for configuring and running streaming services that write these state changes and their surrounding ABCI message context to different destinations.")]),e._v(" "),a("h3",{attrs:{id:"listening-interface"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#listening-interface"}},[e._v("#")]),e._v(" Listening interface")]),e._v(" "),a("p",[e._v("In a new file, "),a("code",[e._v("store/types/listening.go")]),e._v(", we will create a "),a("code",[e._v("WriteListener")]),e._v(" interface for streaming out state changes from a KVStore.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gV3JpdGVMaXN0ZW5lciBpbnRlcmZhY2UgZm9yIHN0cmVhbWluZyBkYXRhIG91dCBmcm9tIGEgbGlzdGVua3YuU3RvcmUKdHlwZSBXcml0ZUxpc3RlbmVyIGludGVyZmFjZSB7CgkvLyBpZiB2YWx1ZSBpcyBuaWwgdGhlbiBpdCB3YXMgZGVsZXRlZAoJLy8gc3RvcmVLZXkgaW5kaWNhdGVzIHRoZSBzb3VyY2UgS1ZTdG9yZSwgdG8gZmFjaWxpdGF0ZSB1c2luZyB0aGUgc2FtZSBXcml0ZUxpc3RlbmVyIGFjcm9zcyBzZXBhcmF0ZSBLVlN0b3JlcwoJLy8gZGVsZXRlIGJvb2wgaW5kaWNhdGVzIGlmIGl0IHdhcyBhIGRlbGV0ZTsgdHJ1ZTogZGVsZXRlLCBmYWxzZTogc2V0CglPbldyaXRlKHN0b3JlS2V5IFN0b3JlS2V5LCBrZXkgW11ieXRlLCB2YWx1ZSBbXWJ5dGUsIGRlbGV0ZSBib29sKSBlcnJvcgp9Cg=="}}),e._v(" "),a("h3",{attrs:{id:"listener-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#listener-type"}},[e._v("#")]),e._v(" Listener type")]),e._v(" "),a("p",[e._v("We will create a concrete implementation of the "),a("code",[e._v("WriteListener")]),e._v(" interface in "),a("code",[e._v("store/types/listening.go")]),e._v(", that writes out protobuf\nencoded KV pairs to an underlying "),a("code",[e._v("io.Writer")]),e._v(".")]),e._v(" "),a("p",[e._v("This will include defining a simple protobuf type for the KV pairs. In addition to the key and value fields this message\nwill include the StoreKey for the originating KVStore so that we can write out from separate KVStores to the same stream/file\nand determine the source of each KV pair.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"protobuf",base64:"bWVzc2FnZSBTdG9yZUtWUGFpciB7CiAgb3B0aW9uYWwgc3RyaW5nIHN0b3JlX2tleSA9IDE7IC8vIHRoZSBzdG9yZSBrZXkgZm9yIHRoZSBLVlN0b3JlIHRoaXMgcGFpciBvcmlnaW5hdGVzIGZyb20KICByZXF1aXJlZCBib29sIHNldCA9IDI7IC8vIHRydWUgaW5kaWNhdGVzIGEgc2V0IG9wZXJhdGlvbiwgZmFsc2UgaW5kaWNhdGVzIGEgZGVsZXRlIG9wZXJhdGlvbgogIHJlcXVpcmVkIGJ5dGVzIGtleSA9IDM7CiAgcmVxdWlyZWQgYnl0ZXMgdmFsdWUgPSA0Owp9Cg=="}}),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gU3RvcmVLVlBhaXJXcml0ZUxpc3RlbmVyIGlzIHVzZWQgdG8gY29uZmlndXJlIGxpc3RlbmluZyB0byBhIEtWU3RvcmUgYnkgd3JpdGluZyBvdXQgbGVuZ3RoLXByZWZpeGVkCi8vIHByb3RvYnVmIGVuY29kZWQgU3RvcmVLVlBhaXJzIHRvIGFuIHVuZGVybHlpbmcgaW8uV3JpdGVyCnR5cGUgU3RvcmVLVlBhaXJXcml0ZUxpc3RlbmVyIHN0cnVjdCB7Cgl3cml0ZXIgaW8uV3JpdGVyCgltYXJzaGFsbGVyIGNvZGVjLkJpbmFyeUNvZGVjCn0KCi8vIE5ld1N0b3JlS1ZQYWlyV3JpdGVMaXN0ZW5lciB3cmFwcyBjcmVhdGVzIGEgU3RvcmVLVlBhaXJXcml0ZUxpc3RlbmVyIHdpdGggYSBwcm92ZGllZCBpby5Xcml0ZXIgYW5kIGNvZGVjLkJpbmFyeUNvZGVjCmZ1bmMgTmV3U3RvcmVLVlBhaXJXcml0ZUxpc3RlbmVyKHcgaW8uV3JpdGVyLCBtIGNvZGVjLkJpbmFyeUNvZGVjKSAqU3RvcmVLVlBhaXJXcml0ZUxpc3RlbmVyIHsKCXJldHVybiAmYW1wO1N0b3JlS1ZQYWlyV3JpdGVMaXN0ZW5lcnsKCQl3cml0ZXI6IHcsCgkJbWFyc2hhbGxlcjogbSwKCX0KfQoKLy8gT25Xcml0ZSBzYXRpc2ZpZXMgdGhlIFdyaXRlTGlzdGVuZXIgaW50ZXJmYWNlIGJ5IHdyaXRpbmcgbGVuZ3RoLXByZWZpeGVkIHByb3RvYnVmIGVuY29kZWQgU3RvcmVLVlBhaXJzCmZ1bmMgKHdsICpTdG9yZUtWUGFpcldyaXRlTGlzdGVuZXIpIE9uV3JpdGUoc3RvcmVLZXkgdHlwZXMuU3RvcmVLZXksIGtleSBbXWJ5dGUsIHZhbHVlIFtdYnl0ZSwgZGVsZXRlIGJvb2wpIGVycm9yIGVycm9yIHsKCWt2UGFpciA6PSBuZXcodHlwZXMuU3RvcmVLVlBhaXIpCglrdlBhaXIuU3RvcmVLZXkgPSBzdG9yZUtleS5OYW1lKCkKCWt2UGFpci5EZWxldGUgPSBEZWxldGUKCWt2UGFpci5LZXkgPSBrZXkKCWt2UGFpci5WYWx1ZSA9IHZhbHVlCglieSwgZXJyIDo9IHdsLm1hcnNoYWxsZXIuTWFyc2hhbEJpbmFyeUxlbmd0aFByZWZpeGVkKGt2UGFpcikKCWlmIGVyciAhPSBuaWwgewogICAgICAgICAgICAgICAgcmV0dXJuIGVycgoJfQogICAgICAgIGlmIF8sIGVyciA6PSB3bC53cml0ZXIuV3JpdGUoYnkpOyBlcnIgIT0gbmlsIHsKICAgICAgICAJcmV0dXJuIGVycgogICAgICAgIH0KICAgICAgICByZXR1cm4gbmlsCn0K"}}),e._v(" "),a("h3",{attrs:{id:"listenkvstore"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#listenkvstore"}},[e._v("#")]),e._v(" ListenKVStore")]),e._v(" "),a("p",[e._v("We will create a new "),a("code",[e._v("Store")]),e._v(" type "),a("code",[e._v("listenkv.Store")]),e._v(" that the "),a("code",[e._v("MultiStore")]),e._v(" wraps around a "),a("code",[e._v("KVStore")]),e._v(" to enable state listening.\nWe can configure the "),a("code",[e._v("Store")]),e._v(" with a set of "),a("code",[e._v("WriteListener")]),e._v("s which stream the output to specific destinations.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gU3RvcmUgaW1wbGVtZW50cyB0aGUgS1ZTdG9yZSBpbnRlcmZhY2Ugd2l0aCBsaXN0ZW5pbmcgZW5hYmxlZC4KLy8gT3BlcmF0aW9ucyBhcmUgdHJhY2VkIG9uIGVhY2ggY29yZSBLVlN0b3JlIGNhbGwgYW5kIHdyaXR0ZW4gdG8gYW55IG9mIHRoZQovLyB1bmRlcmx5aW5nIGxpc3RlbmVycyB3aXRoIHRoZSBwcm9wZXIga2V5IGFuZCBvcGVyYXRpb24gcGVybWlzc2lvbnMKdHlwZSBTdG9yZSBzdHJ1Y3QgewoJcGFyZW50ICAgIHR5cGVzLktWU3RvcmUKCWxpc3RlbmVycyBbXXR5cGVzLldyaXRlTGlzdGVuZXIKCXBhcmVudFN0b3JlS2V5IHR5cGVzLlN0b3JlS2V5Cn0KCi8vIE5ld1N0b3JlIHJldHVybnMgYSByZWZlcmVuY2UgdG8gYSBuZXcgdHJhY2VLVlN0b3JlIGdpdmVuIGEgcGFyZW50Ci8vIEtWU3RvcmUgaW1wbGVtZW50YXRpb24gYW5kIGEgYnVmZmVyZWQgd3JpdGVyLgpmdW5jIE5ld1N0b3JlKHBhcmVudCB0eXBlcy5LVlN0b3JlLCBwc2sgdHlwZXMuU3RvcmVLZXksIGxpc3RlbmVycyBbXXR5cGVzLldyaXRlTGlzdGVuZXIpICpTdG9yZSB7CglyZXR1cm4gJmFtcDtTdG9yZXtwYXJlbnQ6IHBhcmVudCwgbGlzdGVuZXJzOiBsaXN0ZW5lcnMsIHBhcmVudFN0b3JlS2V5OiBwc2t9Cn0KCi8vIFNldCBpbXBsZW1lbnRzIHRoZSBLVlN0b3JlIGludGVyZmFjZS4gSXQgdHJhY2VzIGEgd3JpdGUgb3BlcmF0aW9uIGFuZAovLyBkZWxlZ2F0ZXMgdGhlIFNldCBjYWxsIHRvIHRoZSBwYXJlbnQgS1ZTdG9yZS4KZnVuYyAocyAqU3RvcmUpIFNldChrZXkgW11ieXRlLCB2YWx1ZSBbXWJ5dGUpIHsKCXR5cGVzLkFzc2VydFZhbGlkS2V5KGtleSkKCXMucGFyZW50LlNldChrZXksIHZhbHVlKQoJcy5vbldyaXRlKGZhbHNlLCBrZXksIHZhbHVlKQp9CgovLyBEZWxldGUgaW1wbGVtZW50cyB0aGUgS1ZTdG9yZSBpbnRlcmZhY2UuIEl0IHRyYWNlcyBhIHdyaXRlIG9wZXJhdGlvbiBhbmQKLy8gZGVsZWdhdGVzIHRoZSBEZWxldGUgY2FsbCB0byB0aGUgcGFyZW50IEtWU3RvcmUuCmZ1bmMgKHMgKlN0b3JlKSBEZWxldGUoa2V5IFtdYnl0ZSkgewoJcy5wYXJlbnQuRGVsZXRlKGtleSkKCXMub25Xcml0ZSh0cnVlLCBrZXksIG5pbCkKfQoKLy8gb25Xcml0ZSB3cml0ZXMgYSBLVlN0b3JlIG9wZXJhdGlvbiB0byBhbGwgdGhlIFdyaXRlTGlzdGVuZXJzCmZ1bmMgKHMgKlN0b3JlKSBvbldyaXRlKGRlbGV0ZSBib29sLCBrZXksIHZhbHVlIFtdYnl0ZSkgewoJZm9yIF8sIGwgOj0gcmFuZ2Ugcy5saXN0ZW5lcnMgewoJCWlmIGVyciA6PSBsLk9uV3JpdGUocy5wYXJlbnRTdG9yZUtleSwga2V5LCB2YWx1ZSwgZGVsZXRlKTsgZXJyICE9IG5pbCB7CiAgICAgICAgICAgICAgICAgICAgLy8gbG9nIGVycm9yCiAgICAgICAgICAgICAgICB9Cgl9Cn0K"}}),e._v(" "),a("h3",{attrs:{id:"multistore-interface-updates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#multistore-interface-updates"}},[e._v("#")]),e._v(" MultiStore interface updates")]),e._v(" "),a("p",[e._v("We will update the "),a("code",[e._v("MultiStore")]),e._v(" interface to allow us to wrap a set of listeners around a specific "),a("code",[e._v("KVStore")]),e._v(".\nAdditionally, we will update the "),a("code",[e._v("CacheWrap")]),e._v(" and "),a("code",[e._v("CacheWrapper")]),e._v(" interfaces to enable listening in the caching layer.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBNdWx0aVN0b3JlIGludGVyZmFjZSB7CgkuLi4KCgkvLyBMaXN0ZW5pbmdFbmFibGVkIHJldHVybnMgaWYgbGlzdGVuaW5nIGlzIGVuYWJsZWQgZm9yIHRoZSBLVlN0b3JlIGJlbG9uZ2luZyB0aGUgcHJvdmlkZWQgU3RvcmVLZXkKCUxpc3RlbmluZ0VuYWJsZWQoa2V5IFN0b3JlS2V5KSBib29sCgoJLy8gQWRkTGlzdGVuZXJzIGFkZHMgV3JpdGVMaXN0ZW5lcnMgZm9yIHRoZSBLVlN0b3JlIGJlbG9uZ2luZyB0byB0aGUgcHJvdmlkZWQgU3RvcmVLZXkKCS8vIEl0IGFwcGVuZHMgdGhlIGxpc3RlbmVycyB0byBhIGN1cnJlbnQgc2V0LCBpZiBvbmUgYWxyZWFkeSBleGlzdHMKCUFkZExpc3RlbmVycyhrZXkgU3RvcmVLZXksIGxpc3RlbmVycyBbXVdyaXRlTGlzdGVuZXIpCn0K"}}),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBDYWNoZVdyYXAgaW50ZXJmYWNlIHsKCS4uLgoKCS8vIENhY2hlV3JhcFdpdGhMaXN0ZW5lcnMgcmVjdXJzaXZlbHkgd3JhcHMgYWdhaW4gd2l0aCBsaXN0ZW5pbmcgZW5hYmxlZAoJQ2FjaGVXcmFwV2l0aExpc3RlbmVycyhzdG9yZUtleSB0eXBlcy5TdG9yZUtleSwgbGlzdGVuZXJzIFtdV3JpdGVMaXN0ZW5lcikgQ2FjaGVXcmFwCn0KCnR5cGUgQ2FjaGVXcmFwcGVyIGludGVyZmFjZSB7CgkuLi4KCgkvLyBDYWNoZVdyYXBXaXRoTGlzdGVuZXJzIHJlY3Vyc2l2ZWx5IHdyYXBzIGFnYWluIHdpdGggbGlzdGVuaW5nIGVuYWJsZWQKCUNhY2hlV3JhcFdpdGhMaXN0ZW5lcnMoc3RvcmVLZXkgdHlwZXMuU3RvcmVLZXksIGxpc3RlbmVycyBbXVdyaXRlTGlzdGVuZXIpIENhY2hlV3JhcAp9Cg=="}}),e._v(" "),a("h3",{attrs:{id:"multistore-implementation-updates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#multistore-implementation-updates"}},[e._v("#")]),e._v(" MultiStore implementation updates")]),e._v(" "),a("p",[e._v("We will modify all of the "),a("code",[e._v("Store")]),e._v(" and "),a("code",[e._v("MultiStore")]),e._v(" implementations to satisfy these new interfaces, and adjust the "),a("code",[e._v("rootmulti")]),e._v(" "),a("code",[e._v("GetKVStore")]),e._v(" method\nto wrap the returned "),a("code",[e._v("KVStore")]),e._v(" with a "),a("code",[e._v("listenkv.Store")]),e._v(" if listening is turned on for that "),a("code",[e._v("Store")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAocnMgKlN0b3JlKSBHZXRLVlN0b3JlKGtleSB0eXBlcy5TdG9yZUtleSkgdHlwZXMuS1ZTdG9yZSB7CglzdG9yZSA6PSBycy5zdG9yZXNba2V5XS4odHlwZXMuS1ZTdG9yZSkKCglpZiBycy5UcmFjaW5nRW5hYmxlZCgpIHsKCQlzdG9yZSA9IHRyYWNla3YuTmV3U3RvcmUoc3RvcmUsIHJzLnRyYWNlV3JpdGVyLCBycy50cmFjZUNvbnRleHQpCgl9CglpZiBycy5MaXN0ZW5pbmdFbmFibGVkKGtleSkgewoJCXN0b3JlID0gbGlzdGVua3YuTmV3U3RvcmUoa2V5LCBzdG9yZSwgcnMubGlzdGVuZXJzW2tleV0pCgl9CgoJcmV0dXJuIHN0b3JlCn0K"}}),e._v(" "),a("p",[e._v("We will also adjust the "),a("code",[e._v("cachemulti")]),e._v(" constructor methods and the "),a("code",[e._v("rootmulti")]),e._v(" "),a("code",[e._v("CacheMultiStore")]),e._v(" method to forward the listeners\nto and enable listening in the cache layer.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAocnMgKlN0b3JlKSBDYWNoZU11bHRpU3RvcmUoKSB0eXBlcy5DYWNoZU11bHRpU3RvcmUgewoJc3RvcmVzIDo9IG1ha2UobWFwW3R5cGVzLlN0b3JlS2V5XXR5cGVzLkNhY2hlV3JhcHBlcikKCWZvciBrLCB2IDo9IHJhbmdlIHJzLnN0b3JlcyB7CgkJc3RvcmVzW2tdID0gdgoJfQoJcmV0dXJuIGNhY2hlbXVsdGkuTmV3U3RvcmUocnMuZGIsIHN0b3JlcywgcnMua2V5c0J5TmFtZSwgcnMudHJhY2VXcml0ZXIsIHJzLnRyYWNlQ29udGV4dCwgcnMubGlzdGVuZXJzKQp9Cg=="}}),e._v(" "),a("h3",{attrs:{id:"exposing-the-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#exposing-the-data"}},[e._v("#")]),e._v(" Exposing the data")]),e._v(" "),a("h4",{attrs:{id:"streaming-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#streaming-service"}},[e._v("#")]),e._v(" Streaming service")]),e._v(" "),a("p",[e._v("We will introduce a new "),a("code",[e._v("StreamingService")]),e._v(" interface for exposing "),a("code",[e._v("WriteListener")]),e._v(" data streams to external consumers.\nIn addition to streaming state changes as "),a("code",[e._v("StoreKVPair")]),e._v("s, the interface satisfies an "),a("code",[e._v("ABCIListener")]),e._v(" interface that plugs\ninto the BaseApp and relays ABCI requests and responses so that the service can group the state changes with the ABCI\nrequests that affected them and the ABCI responses they affected. The "),a("code",[e._v("ABCIListener")]),e._v(" interface also exposes a\n"),a("code",[e._v("ListenSuccess")]),e._v(" method which is (optionally) used by the "),a("code",[e._v("BaseApp")]),e._v(" to await positive acknowledgement of message\nreceipt from the "),a("code",[e._v("StreamingService")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gQUJDSUxpc3RlbmVyIGludGVyZmFjZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgQUJDSSBtZXNzYWdlIHByb2Nlc3Npbmcgb2YgdGhlIEJhc2VBcHAKdHlwZSBBQkNJTGlzdGVuZXIgaW50ZXJmYWNlIHsKCS8vIExpc3RlbkJlZ2luQmxvY2sgdXBkYXRlcyB0aGUgc3RyZWFtaW5nIHNlcnZpY2Ugd2l0aCB0aGUgbGF0ZXN0IEJlZ2luQmxvY2sgbWVzc2FnZXMKCUxpc3RlbkJlZ2luQmxvY2soY3R4IHR5cGVzLkNvbnRleHQsIHJlcSBhYmNpLlJlcXVlc3RCZWdpbkJsb2NrLCByZXMgYWJjaS5SZXNwb25zZUJlZ2luQmxvY2spIGVycm9yCgkvLyBMaXN0ZW5FbmRCbG9jayB1cGRhdGVzIHRoZSBzdGVhbWluZyBzZXJ2aWNlIHdpdGggdGhlIGxhdGVzdCBFbmRCbG9jayBtZXNzYWdlcwoJTGlzdGVuRW5kQmxvY2soY3R4IHR5cGVzLkNvbnRleHQsIHJlcSBhYmNpLlJlcXVlc3RFbmRCbG9jaywgcmVzIGFiY2kuUmVzcG9uc2VFbmRCbG9jaykgZXJyb3IKCS8vIExpc3RlbkRlbGl2ZXJUeCB1cGRhdGVzIHRoZSBzdGVhbWluZyBzZXJ2aWNlIHdpdGggdGhlIGxhdGVzdCBEZWxpdmVyVHggbWVzc2FnZXMKCUxpc3RlbkRlbGl2ZXJUeChjdHggdHlwZXMuQ29udGV4dCwgcmVxIGFiY2kuUmVxdWVzdERlbGl2ZXJUeCwgcmVzIGFiY2kuUmVzcG9uc2VEZWxpdmVyVHgpIGVycm9yCgkvLyBMaXN0ZW5TdWNjZXNzIHJldHVybnMgYSBjaGFuIHRoYXQgaXMgdXNlZCB0byBhY2tub3dsZWRnZSBzdWNjZXNzZnVsIHJlY2VpcHQgb2YgbWVzc2FnZXMgYnkgdGhlIGV4dGVybmFsIHNlcnZpY2UKCS8vIGFmdGVyIHNvbWUgY29uZmlndXJhYmxlIGRlbGF5LCBgZmFsc2VgIGlzIHNlbnQgdG8gdGhpcyBjaGFubmVsIGZyb20gdGhlIHNlcnZpY2UgdG8gc2lnbmlmeSBmYWlsdXJlIG9mIHJlY2VpcHQKCUxpc3RlblN1Y2Nlc3MoKSAmbHQ7LWNoYW4gYm9vbAp9CgovLyBTdHJlYW1pbmdTZXJ2aWNlIGludGVyZmFjZSBmb3IgcmVnaXN0ZXJpbmcgV3JpdGVMaXN0ZW5lcnMgd2l0aCB0aGUgQmFzZUFwcCBhbmQgdXBkYXRpbmcgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgQUJDSSBtZXNzYWdlcyB1c2luZyB0aGUgaG9va3MKdHlwZSBTdHJlYW1pbmdTZXJ2aWNlIGludGVyZmFjZSB7CgkvLyBTdHJlYW0gaXMgdGhlIHN0cmVhbWluZyBzZXJ2aWNlIGxvb3AsIGF3YWl0cyBrdiBwYWlycyBhbmQgd3JpdGVzIHRoZW0gdG8gYSBkZXN0aW5hdGlvbiBzdHJlYW0gb3IgZmlsZQoJU3RyZWFtKHdnICpzeW5jLldhaXRHcm91cCkgZXJyb3IKCS8vIExpc3RlbmVycyByZXR1cm5zIHRoZSBzdHJlYW1pbmcgc2VydmljZSdzIGxpc3RlbmVycyBmb3IgdGhlIEJhc2VBcHAgdG8gcmVnaXN0ZXIKCUxpc3RlbmVycygpIG1hcFt0eXBlcy5TdG9yZUtleV1bXXN0b3JlLldyaXRlTGlzdGVuZXIKCS8vIEFCQ0lMaXN0ZW5lciBpbnRlcmZhY2UgZm9yIGhvb2tpbmcgaW50byB0aGUgQUJDSSBtZXNzYWdlcyBmcm9tIGluc2lkZSB0aGUgQmFzZUFwcAoJQUJDSUxpc3RlbmVyCgkvLyBDbG9zZXIgaW50ZXJmYWNlCglpby5DbG9zZXIKfQo="}}),e._v(" "),a("h4",{attrs:{id:"baseapp-registration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#baseapp-registration"}},[e._v("#")]),e._v(" BaseApp registration")]),e._v(" "),a("p",[e._v("We will add a new method to the "),a("code",[e._v("BaseApp")]),e._v(" to enable the registration of "),a("code",[e._v("StreamingService")]),e._v("s:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gU2V0U3RyZWFtaW5nU2VydmljZSBpcyB1c2VkIHRvIHNldCBhIHN0cmVhbWluZyBzZXJ2aWNlIGludG8gdGhlIEJhc2VBcHAgaG9va3MgYW5kIGxvYWQgdGhlIGxpc3RlbmVycyBpbnRvIHRoZSBtdWx0aXN0b3JlCmZ1bmMgKGFwcCAqQmFzZUFwcCkgU2V0U3RyZWFtaW5nU2VydmljZShzIFN0cmVhbWluZ1NlcnZpY2UpIHsKCS8vIGFkZCB0aGUgbGlzdGVuZXJzIGZvciBlYWNoIFN0b3JlS2V5Cglmb3Iga2V5LCBsaXMgOj0gcmFuZ2Ugcy5MaXN0ZW5lcnMoKSB7CgkJYXBwLmNtcy5BZGRMaXN0ZW5lcnMoa2V5LCBsaXMpCgl9CgkvLyByZWdpc3RlciB0aGUgU3RyZWFtaW5nU2VydmljZSB3aXRoaW4gdGhlIEJhc2VBcHAKCS8vIEJhc2VBcHAgd2lsbCBwYXNzIEJlZ2luQmxvY2ssIERlbGl2ZXJUeCwgYW5kIEVuZEJsb2NrIHJlcXVlc3RzIGFuZCByZXNwb25zZXMgdG8gdGhlIHN0cmVhbWluZyBzZXJ2aWNlcyB0byB1cGRhdGUgdGhlaXIgQUJDSSBjb250ZXh0CglhcHAuYWJjaUxpc3RlbmVycyA9IGFwcGVuZChhcHAuYWJjaUxpc3RlbmVycywgcykKfQo="}}),e._v(" "),a("p",[e._v("We will add a new method to the "),a("code",[e._v("BaseApp")]),e._v(" that is used to configure a global wait limit for receiving positive acknowledgement\nof message receipt from the integrated "),a("code",[e._v("StreamingService")]),e._v("s.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpCYXNlQXBwKSBTZXRHbG9iYWxXYWl0TGltaXQodCB0aW1lLkR1cmF0aW9uKSB7CglhcHAuZ2xvYmFsV2FpdExpbWl0ID0gdAp9Cg=="}}),e._v(" "),a("p",[e._v("We will also modify the "),a("code",[e._v("BeginBlock")]),e._v(", "),a("code",[e._v("EndBlock")]),e._v(", and "),a("code",[e._v("DeliverTx")]),e._v(" methods to pass ABCI requests and responses to any streaming service hooks registered\nwith the "),a("code",[e._v("BaseApp")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpCYXNlQXBwKSBCZWdpbkJsb2NrKHJlcSBhYmNpLlJlcXVlc3RCZWdpbkJsb2NrKSAocmVzIGFiY2kuUmVzcG9uc2VCZWdpbkJsb2NrKSB7CgoJLi4uCgoJLy8gQ2FsbCB0aGUgc3RyZWFtaW5nIHNlcnZpY2UgaG9va3Mgd2l0aCB0aGUgQmVnaW5CbG9jayBtZXNzYWdlcwoJZm9yIF8sIGxpc3RlbmVyIDo9IHJhbmdlIGFwcC5hYmNpTGlzdGVuZXJzIHsKCQlsaXN0ZW5lci5MaXN0ZW5CZWdpbkJsb2NrKGFwcC5kZWxpdmVyU3RhdGUuY3R4LCByZXEsIHJlcykKCX0KCglyZXR1cm4gcmVzCn0K"}}),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpCYXNlQXBwKSBFbmRCbG9jayhyZXEgYWJjaS5SZXF1ZXN0RW5kQmxvY2spIChyZXMgYWJjaS5SZXNwb25zZUVuZEJsb2NrKSB7CgoJLi4uCgoJLy8gQ2FsbCB0aGUgc3RyZWFtaW5nIHNlcnZpY2UgaG9va3Mgd2l0aCB0aGUgRW5kQmxvY2sgbWVzc2FnZXMKCWZvciBfLCBsaXN0ZW5lciA6PSByYW5nZSBhcHAuYWJjaUxpc3RlbmVycyB7CgkJbGlzdGVuZXIuTGlzdGVuRW5kQmxvY2soYXBwLmRlbGl2ZXJTdGF0ZS5jdHgsIHJlcSwgcmVzKQoJfQoKCXJldHVybiByZXMKfQo="}}),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpCYXNlQXBwKSBEZWxpdmVyVHgocmVxIGFiY2kuUmVxdWVzdERlbGl2ZXJUeCkgYWJjaS5SZXNwb25zZURlbGl2ZXJUeCB7CgoJLi4uCgoJZ0luZm8sIHJlc3VsdCwgZXJyIDo9IGFwcC5ydW5UeChydW5UeE1vZGVEZWxpdmVyLCByZXEuVHgpCglpZiBlcnIgIT0gbmlsIHsKCQlyZXN1bHRTdHIgPSAmcXVvdDtmYWlsZWQmcXVvdDsKCQlyZXMgOj0gc2RrZXJyb3JzLlJlc3BvbnNlRGVsaXZlclR4KGVyciwgZ0luZm8uR2FzV2FudGVkLCBnSW5mby5HYXNVc2VkLCBhcHAudHJhY2UpCgkJLy8gSWYgd2UgdGhyb3cgYW4gZXJyb3IsIGJlIHN1cmUgdG8gc3RpbGwgY2FsbCB0aGUgc3RyZWFtaW5nIHNlcnZpY2UncyBob29rCgkJZm9yIF8sIGxpc3RlbmVyIDo9IHJhbmdlIGFwcC5hYmNpTGlzdGVuZXJzIHsKCQkJbGlzdGVuZXIuTGlzdGVuRGVsaXZlclR4KGFwcC5kZWxpdmVyU3RhdGUuY3R4LCByZXEsIHJlcykKCQl9CgkJcmV0dXJuIHJlcwoJfQoKCXJlcyA6PSBhYmNpLlJlc3BvbnNlRGVsaXZlclR4ewoJCUdhc1dhbnRlZDogaW50NjQoZ0luZm8uR2FzV2FudGVkKSwgLy8gVE9ETzogU2hvdWxkIHR5cGUgYWNjZXB0IHVuc2lnbmVkIGludHM/CgkJR2FzVXNlZDogICBpbnQ2NChnSW5mby5HYXNVc2VkKSwgICAvLyBUT0RPOiBTaG91bGQgdHlwZSBhY2NlcHQgdW5zaWduZWQgaW50cz8KCQlMb2c6ICAgICAgIHJlc3VsdC5Mb2csCgkJRGF0YTogICAgICByZXN1bHQuRGF0YSwKCQlFdmVudHM6ICAgIHNkay5NYXJrRXZlbnRzVG9JbmRleChyZXN1bHQuRXZlbnRzLCBhcHAuaW5kZXhFdmVudHMpLAoJfQoKCS8vIENhbGwgdGhlIHN0cmVhbWluZyBzZXJ2aWNlIGhvb2tzIHdpdGggdGhlIERlbGl2ZXJUeCBtZXNzYWdlcwoJZm9yIF8sIGxpc3RlbmVyIDo9IHJhbmdlIGFwcC5hYmNpTGlzdGVuZXJzIHsKCQlsaXN0ZW5lci5MaXN0ZW5EZWxpdmVyVHgoYXBwLmRlbGl2ZXJTdGF0ZS5jdHgsIHJlcSwgcmVzKQoJfQoKCXJldHVybiByZXMKfQo="}}),e._v(" "),a("p",[e._v("We will also modify the "),a("code",[e._v("Commit")]),e._v(" method to process "),a("code",[e._v("success/failure")]),e._v(" signals from the integrated "),a("code",[e._v("StreamingService")]),e._v("s using\nthe "),a("code",[e._v("ABCIListener.ListenSuccess()")]),e._v(" method. Each "),a("code",[e._v("StreamingService")]),e._v(" has an internal wait threshold after which it sends\n"),a("code",[e._v("false")]),e._v(" to the "),a("code",[e._v("ListenSuccess()")]),e._v(" channel, and the BaseApp also imposes a configurable global wait limit.\nIf the "),a("code",[e._v("StreamingService")]),e._v(' is operating in a "fire-and-forget" mode, '),a("code",[e._v("ListenSuccess()")]),e._v(" should immediately return "),a("code",[e._v("true")]),e._v("\noff the channel despite the success status of the service.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAoYXBwICpCYXNlQXBwKSBDb21taXQoKSAocmVzIGFiY2kuUmVzcG9uc2VDb21taXQpIHsKCQoJLi4uCgoJdmFyIGhhbHQgYm9vbAoKCXN3aXRjaCB7CgljYXNlIGFwcC5oYWx0SGVpZ2h0ICZndDsgMCAmYW1wOyZhbXA7IHVpbnQ2NChoZWFkZXIuSGVpZ2h0KSAmZ3Q7PSBhcHAuaGFsdEhlaWdodDoKCQloYWx0ID0gdHJ1ZQoKCWNhc2UgYXBwLmhhbHRUaW1lICZndDsgMCAmYW1wOyZhbXA7IGhlYWRlci5UaW1lLlVuaXgoKSAmZ3Q7PSBpbnQ2NChhcHAuaGFsdFRpbWUpOgoJCWhhbHQgPSB0cnVlCgl9CgoJLy8gZWFjaCBsaXN0ZW5lciBoYXMgYW4gaW50ZXJuYWwgd2FpdCB0aHJlc2hvbGQgYWZ0ZXIgd2hpY2ggaXQgc2VuZHMgYGZhbHNlYCB0byB0aGUgTGlzdGVuU3VjY2VzcygpIGNoYW5uZWwKCS8vIGJ1dCB0aGUgQmFzZUFwcCBhbHNvIGltcG9zZXMgYSBnbG9iYWwgd2FpdCBsaW1pdAoJbWF4V2FpdCA6PSB0aW1lLk5ld1RpY2tlcihhcHAuZ2xvYmFsV2FpdExpbWl0KQoJZm9yIF8sIGxpcyA6PSByYW5nZSBhcHAuYWJjaUxpc3RlbmVycyB7CgkJc2VsZWN0IHsKCQljYXNlIHN1Y2Nlc3MgOj0gJmx0Oy0gbGlzLkxpc3RlblN1Y2Nlc3MoKToKCQkJaWYgc3VjY2VzcyA9PSBmYWxzZSB7CgkJCQloYWx0ID0gdHJ1ZQoJCQkJYnJlYWsKCQkJfQoJCWNhc2UgJmx0Oy0gbWF4V2FpdC5DOgoJCQloYWx0ID0gdHJ1ZQoJCQlicmVhawoJCX0KCX0KCglpZiBoYWx0IHsKCQkvLyBIYWx0IHRoZSBiaW5hcnkgYW5kIGFsbG93IFRlbmRlcm1pbnQgdG8gcmVjZWl2ZSB0aGUgUmVzcG9uc2VDb21taXQKCQkvLyByZXNwb25zZSB3aXRoIHRoZSBjb21taXQgSUQgaGFzaC4gVGhpcyB3aWxsIGFsbG93IHRoZSBub2RlIHRvIHN1Y2Nlc3NmdWxseQoJCS8vIHJlc3RhcnQgYW5kIHByb2Nlc3MgYmxvY2tzIGFzc3VtaW5nIHRoZSBoYWx0IGNvbmZpZ3VyYXRpb24gaGFzIGJlZW4KCQkvLyByZXNldCBvciBtb3ZlZCB0byBhIG1vcmUgZGlzdGFudCB2YWx1ZS4KCQlhcHAuaGFsdCgpCgl9CgoJLi4uCgp9Cg=="}}),e._v(" "),a("h4",{attrs:{id:"plugin-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#plugin-system"}},[e._v("#")]),e._v(" Plugin system")]),e._v(" "),a("p",[e._v("We propose a plugin architecture to load and run "),a("code",[e._v("StreamingService")]),e._v(" implementations. We will introduce a plugin\nloading/preloading system that is used to load, initialize, inject, run, and stop Cosmos-SDK plugins. Each plugin\nmust implement the following interface:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gUGx1Z2luIGlzIHRoZSBiYXNlIGludGVyZmFjZSBmb3IgYWxsIGtpbmRzIG9mIGNvc21vcy1zZGsgcGx1Z2lucwovLyBJdCB3aWxsIGJlIGluY2x1ZGVkIGluIGludGVyZmFjZXMgb2YgZGlmZmVyZW50IFBsdWdpbnMKdHlwZSBQbHVnaW4gaW50ZXJmYWNlIHsKCS8vIE5hbWUgc2hvdWxkIHJldHVybiB1bmlxdWUgbmFtZSBvZiB0aGUgcGx1Z2luCglOYW1lKCkgc3RyaW5nCgoJLy8gVmVyc2lvbiByZXR1cm5zIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgcGx1Z2luCglWZXJzaW9uKCkgc3RyaW5nCgoJLy8gSW5pdCBpcyBjYWxsZWQgb25jZSB3aGVuIHRoZSBQbHVnaW4gaXMgYmVpbmcgbG9hZGVkCgkvLyBUaGUgcGx1Z2luIGlzIHBhc3NlZCB0aGUgQXBwT3B0aW9ucyBmb3IgY29uZmlndXJhdGlvbgoJLy8gQSBwbHVnaW4gd2lsbCBub3QgbmVjZXNzYXJpbHkgaGF2ZSBhIGZ1bmN0aW9uYWwgSW5pdAoJSW5pdChlbnYgc2VydmVyVHlwZXMuQXBwT3B0aW9ucykgZXJyb3IKCgkvLyBDbG9zZXIgaW50ZXJmYWNlIGZvciBzaHV0dGluZyBkb3duIHRoZSBwbHVnaW4gcHJvY2VzcwoJaW8uQ2xvc2VyCn0K"}}),e._v(" "),a("p",[e._v("The "),a("code",[e._v("Name")]),e._v(" method returns a plugin's name.\nThe "),a("code",[e._v("Version")]),e._v(" method returns a plugin's version.\nThe "),a("code",[e._v("Init")]),e._v(" method initializes a plugin with the provided "),a("code",[e._v("AppOptions")]),e._v(".\nThe io.Closer is used to shut down the plugin service.")]),e._v(" "),a("p",[e._v("For the purposes of this ADR we introduce a single kind of plugin- a state streaming plugin.\nWe will define a "),a("code",[e._v("StateStreamingPlugin")]),e._v(" interface which extends the above "),a("code",[e._v("Plugin")]),e._v(" interface to support a state streaming service.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gU3RhdGVTdHJlYW1pbmdQbHVnaW4gaW50ZXJmYWNlIGZvciBwbHVnaW5zIHRoYXQgbG9hZCBhIGJhc2VhcHAuU3RyZWFtaW5nU2VydmljZSBvbnRvIGEgYmFzZWFwcC5CYXNlQXBwCnR5cGUgU3RhdGVTdHJlYW1pbmdQbHVnaW4gaW50ZXJmYWNlIHsKCS8vIFJlZ2lzdGVyIGNvbmZpZ3VyZXMgYW5kIHJlZ2lzdGVycyB0aGUgcGx1Z2luIHN0cmVhbWluZyBzZXJ2aWNlIHdpdGggdGhlIEJhc2VBcHAKCVJlZ2lzdGVyKGJBcHAgKmJhc2VhcHAuQmFzZUFwcCwgbWFyc2hhbGxlciBjb2RlYy5CaW5hcnlDb2RlYywga2V5cyBtYXBbc3RyaW5nXSp0eXBlcy5LVlN0b3JlS2V5KSBlcnJvcgoKCS8vIFN0YXJ0IHN0YXJ0cyB0aGUgYmFja2dyb3VuZCBzdHJlYW1pbmcgcHJvY2VzcyBvZiB0aGUgcGx1Z2luIHN0cmVhbWluZyBzZXJ2aWNlCglTdGFydCh3ZyAqc3luYy5XYWl0R3JvdXApCgoJLy8gUGx1Z2luIGlzIHRoZSBiYXNlIFBsdWdpbiBpbnRlcmZhY2UKCVBsdWdpbgp9Cg=="}}),e._v(" "),a("p",[e._v("The "),a("code",[e._v("Register")]),e._v(" method is used during App construction to register the plugin's streaming service with an App's BaseApp using the BaseApp's "),a("code",[e._v("SetStreamingService")]),e._v(" method.\nThe "),a("code",[e._v("Start")]),e._v(" method is used during App construction to start the registered plugin streaming services and maintain synchronization with them.")]),e._v(" "),a("p",[e._v("e.g. in "),a("code",[e._v("NewSimApp")]),e._v(":")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyBOZXdTaW1BcHAoCglsb2dnZXIgbG9nLkxvZ2dlciwgZGIgZGJtLkRCLCB0cmFjZVN0b3JlIGlvLldyaXRlciwgbG9hZExhdGVzdCBib29sLCBza2lwVXBncmFkZUhlaWdodHMgbWFwW2ludDY0XWJvb2wsCglob21lUGF0aCBzdHJpbmcsIGludkNoZWNrUGVyaW9kIHVpbnQsIGVuY29kaW5nQ29uZmlnIHNpbWFwcHBhcmFtcy5FbmNvZGluZ0NvbmZpZywKCWFwcE9wdHMgc2VydmVydHlwZXMuQXBwT3B0aW9ucywgYmFzZUFwcE9wdGlvbnMgLi4uZnVuYygqYmFzZWFwcC5CYXNlQXBwKSwKKSAqU2ltQXBwIHsKCgkuLi4KCgkvLyB0aGlzIGxvYWRzIHRoZSBwcmVsb2FkZWQgYW5kIGFueSBwbHVnaW5zIGZvdW5kIGluIGBwbHVnaW5zLmRpcmAKCXBsdWdpbkxvYWRlciwgZXJyIDo9IGxvYWRlci5OZXdQbHVnaW5Mb2FkZXIoYXBwT3B0cywgbG9nZ2VyKQoJaWYgZXJyICE9IG5pbCB7CiAgICAgICAgLy8gaGFuZGxlIGVycm9yCiAgICB9CgoJLy8gaW5pdGlhbGl6ZSB0aGUgbG9hZGVkIHBsdWdpbnMKCWlmIGVyciA6PSBwbHVnaW5Mb2FkZXIuSW5pdGlhbGl6ZSgpOyBlcnIgIT0gbmlsIHsKCQkvLyBoYW5sZGUgZXJyb3IKICAgIH0KCglrZXlzIDo9IHNkay5OZXdLVlN0b3JlS2V5cygKCQlhdXRodHlwZXMuU3RvcmVLZXksIGJhbmt0eXBlcy5TdG9yZUtleSwgc3Rha2luZ3R5cGVzLlN0b3JlS2V5LAoJCW1pbnR0eXBlcy5TdG9yZUtleSwgZGlzdHJ0eXBlcy5TdG9yZUtleSwgc2xhc2hpbmd0eXBlcy5TdG9yZUtleSwKCQlnb3Z0eXBlcy5TdG9yZUtleSwgcGFyYW1zdHlwZXMuU3RvcmVLZXksIGliY2hvc3QuU3RvcmVLZXksIHVwZ3JhZGV0eXBlcy5TdG9yZUtleSwKCQlldmlkZW5jZXR5cGVzLlN0b3JlS2V5LCBpYmN0cmFuc2ZlcnR5cGVzLlN0b3JlS2V5LCBjYXBhYmlsaXR5dHlwZXMuU3RvcmVLZXksCgkpCgoJLy8gcmVnaXN0ZXIgdGhlIHBsdWdpbihzKSB3aXRoIHRoZSBCYXNlQXBwCglpZiBlcnIgOj0gcGx1Z2luTG9hZGVyLkluamVjdChiQXBwLCBhcHBDb2RlYywga2V5cyk7IGVyciAhPSBuaWwgewoJCS8vIGhhbmRsZSBlcnJvcgogICAgfQoKCS8vIHN0YXJ0IHRoZSBwbHVnaW4gc2VydmljZXMsIG9wdGlvbmFsbHkgdXNlIHdnIHRvIHN5bmNocm9uaXplIHNodXRkb3duIHVzaW5nIGlvLkNsb3NlcgoJd2cgOj0gbmV3KHN5bmMuV2FpdEdyb3VwKQoJaWYgZXJyIDo9IHBsdWdpbkxvYWRlci5TdGFydCh3Zyk7IGVyciAhPSBuaWwgewoJCS8vIGhhbmRsZXIgZXJyb3IKICAgIH0KCgkuLi4KCglyZXR1cm4gYXBwCn0K"}}),e._v(" "),a("h4",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),a("p",[e._v("The plugin system will be configured within an app's app.toml file.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"toml",base64:"W3BsdWdpbnNdCiAgICBvbiA9IGZhbHNlICMgdHVybiB0aGUgcGx1Z2luIHN5c3RlbSwgYXMgYSB3aG9sZSwgb24gb3Igb2ZmCiAgICBkaXNhYmxlZCA9IFsmcXVvdDtsaXN0JnF1b3Q7LCAmcXVvdDtvZiZxdW90OywgJnF1b3Q7cGx1Z2luJnF1b3Q7LCAmcXVvdDtuYW1lcyZxdW90OywgJnF1b3Q7dG8mcXVvdDssICZxdW90O2Rpc2FibGUmcXVvdDtdCiAgICBkaXIgPSAmcXVvdDt0aGUgZGlyZWN0b3J5IHRvIGxvYWQgbm9uLXByZWxvYWRlZCBwbHVnaW5zIGZyb207IGRlZmF1bHRzIHRvIGNvc21vcy1zZGsvcGx1Z2luL3BsdWdpbnMmcXVvdDsK"}}),e._v(" "),a("p",[e._v("There will be three parameters for configuring the plugin system: "),a("code",[e._v("plugins.on")]),e._v(", "),a("code",[e._v("plugins.disabled")]),e._v(" and "),a("code",[e._v("plugins.dir")]),e._v(".\n"),a("code",[e._v("plugins.on")]),e._v(" is a bool that turns on or off the plugin system at large, "),a("code",[e._v("plugins.dir")]),e._v(" directs the system to a directory\nto load plugins from, and "),a("code",[e._v("plugins.disabled")]),e._v(" is a list of names for the plugins we want to disable (useful for disabling preloaded plugins).")]),e._v(" "),a("p",[e._v("Configuration of a given plugin is ultimately specific to the plugin, but we will introduce some standards here:")]),e._v(" "),a("p",[e._v("Plugin TOML configuration should be split into separate sub-tables for each kind of plugin (e.g. "),a("code",[e._v("plugins.streaming")]),e._v(").\nWithin these sub-tables, the parameters for a specific plugin of that kind are included in another sub-table (e.g. "),a("code",[e._v("plugins.streaming.file")]),e._v(").\nIt is generally expected, but not required, that a streaming service plugin can be configured with a set of store keys\n(e.g. "),a("code",[e._v("plugins.streaming.file.keys")]),e._v(") for the stores it listens to and a mode (e.g. "),a("code",[e._v("plugins.streaming.file.mode")]),e._v(")\nthat signifies whether the service operates in a fire-and-forget capacity ("),a("code",[e._v("faf")]),e._v(") or the BaseApp should require positive\nacknowledgement of message receipt by the service ("),a("code",[e._v("ack")]),e._v(").")]),e._v(" "),a("p",[e._v("e.g.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"toml",base64:"W3BsdWdpbnNdCiAgICBvbiA9IGZhbHNlICMgdHVybiB0aGUgcGx1Z2luIHN5c3RlbSwgYXMgYSB3aG9sZSwgb24gb3Igb2ZmCiAgICBkaXNhYmxlZCA9IFsmcXVvdDtsaXN0JnF1b3Q7LCAmcXVvdDtvZiZxdW90OywgJnF1b3Q7cGx1Z2luJnF1b3Q7LCAmcXVvdDtuYW1lcyZxdW90OywgJnF1b3Q7dG8mcXVvdDssICZxdW90O2Rpc2FibGUmcXVvdDtdCiAgICBkaXIgPSAmcXVvdDt0aGUgZGlyZWN0b3J5IHRvIGxvYWQgbm9uLXByZWxvYWRlZCBwbHVnaW5zIGZyb207IGRlZmF1bHRzIHRvICZxdW90OwogICAgW3BsdWdpbnMuc3RyZWFtaW5nXSAjIGEgbWFwcGluZyBvZiBwbHVnaW4tc3BlY2lmaWMgc3RyZWFtaW5nIHNlcnZpY2UgcGFyYW1ldGVycywgbWFwcGVkIHRvIHRoZWlyIHBsdWdpbiBuYW1lCiAgICAgICAgW3BsdWdpbnMuc3RyZWFtaW5nLmZpbGVdICMgdGhlIHNwZWNpZmljIHBhcmFtZXRlcnMgZm9yIHRoZSBmaWxlIHN0cmVhbWluZyBzZXJ2aWNlIHBsdWdpbgogICAgICAgICAgICBrZXlzID0gWyZxdW90O2xpc3QmcXVvdDssICZxdW90O29mJnF1b3Q7LCAmcXVvdDtzdG9yZSZxdW90OywgJnF1b3Q7a2V5cyZxdW90OywgJnF1b3Q7d2UmcXVvdDssICZxdW90O3dhbnQmcXVvdDssICZxdW90O3RvJnF1b3Q7LCAmcXVvdDtleHBvc2UmcXVvdDssICZxdW90O2ZvciZxdW90OywgJnF1b3Q7dGhpcyZxdW90OywgJnF1b3Q7c3RyZWFtaW5nJnF1b3Q7LCAmcXVvdDtzZXJ2aWNlJnF1b3Q7XQogICAgICAgICAgICB3cml0ZURpciA9ICZxdW90O3BhdGggdG8gdGhlIHdyaXRlIGRpcmVjdG9yeSZxdW90OwogICAgICAgICAgICBwcmVmaXggPSAmcXVvdDtvcHRpb25hbCBwcmVmaXggdG8gcHJlcGVuZCB0byB0aGUgZ2VuZXJhdGVkIGZpbGUgbmFtZXMmcXVvdDsKICAgICAgICAgICAgbW9kZSA9ICZxdW90O2ZhZiZxdW90OyAjIGZhZiA9PSBmaXJlLWFuZC1mb3JnZXQ7IGFjayA9PSByZXF1aXJlIHBvc2l0aXZlIGFja25vd2xlZGdlIG9mIHJlY2VpcHQKICAgICAgICBbcGx1Z2lucy5zdHJlYW1pbmcua2Fma2FdCiAgICAgICAgICAgIC4uLgogICAgW3BsdWdpbnMubW9kdWxlc10KICAgICAgICAuLi4K"}}),e._v(" "),a("h4",{attrs:{id:"encoding-and-decoding-streams"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encoding-and-decoding-streams"}},[e._v("#")]),e._v(" Encoding and decoding streams")]),e._v(" "),a("p",[e._v("ADR-038 introduces the interfaces and types for streaming state changes out from KVStores, associating this\ndata with their related ABCI requests and responses, and registering a service for consuming this data and streaming it to some destination in a final format.\nInstead of prescribing a final data format in this ADR, it is left to a specific plugin implementation to define and document this format.\nWe take this approach because flexibility in the final format is necessary to support a wide range of streaming service plugins. For example,\nthe data format for a streaming service that writes the data out to a set of files will differ from the data format that is written to a Kafka topic.")]),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("p",[e._v("These changes will provide a means of subscribing to KVStore state changes in real time.")]),e._v(" "),a("h3",{attrs:{id:"backwards-compatibility"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backwards-compatibility"}},[e._v("#")]),e._v(" Backwards Compatibility")]),e._v(" "),a("ul",[a("li",[e._v("This ADR changes the "),a("code",[e._v("MultiStore")]),e._v(", "),a("code",[e._v("CacheWrap")]),e._v(", and "),a("code",[e._v("CacheWrapper")]),e._v(" interfaces, implementations supporting the previous version of these interfaces will not support the new ones")])]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("ul",[a("li",[e._v("Ability to listen to KVStore state changes in real time and expose these events to external consumers")])]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("ul",[a("li",[e._v("Changes "),a("code",[e._v("MultiStore")]),e._v(", "),a("code",[e._v("CacheWrap")]),e._v(", and "),a("code",[e._v("CacheWrapper")]),e._v(" interfaces")])]),e._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),a("ul",[a("li",[e._v("Introduces additional- but optional- complexity to configuring and running a cosmos application")]),e._v(" "),a("li",[e._v("If an application developer opts to use these features to expose data, they need to be aware of the ramifications/risks of that data exposure as it pertains to the specifics of their application")])])],1)}),[],!1,null,null,null);l.default=t.exports}}]);