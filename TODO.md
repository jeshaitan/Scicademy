#error with mlab?

/home/jeshaitan/Personal/Scicademy/node_modules/mongodb/lib/server.js:236
        process.nextTick(function() { throw err; })
	                                      ^
					      Error: getaddrinfo EAI_AGAIN ds036698.mongolab.com:36698
					          at Object.exports._errnoException (util.js:856:11)
						      at errnoException (dns.js:32:15)
						          at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:78:26)


/home/jeshaitan/Personal/Scicademy/node_modules/mongodb/lib/mongo_client.js:398
              throw err
	                    ^
			    MongoError: only DEFAULT, GSSAPI, PLAIN, MONGODB-X509, SCRAM-SHA-1 or MONGODB-CR is supported by authMechanism
			        at Function.MongoError.create (/home/jeshaitan/Personal/Scicademy/node_modules/mongodb-core/lib/error.js:31:11)
				    at Db.authenticate (/home/jeshaitan/Personal/Scicademy/node_modules/mongodb/lib/db.js:1513:50)
				        at /home/jeshaitan/Personal/Scicademy/node_modules/mongodb/lib/mongo_client.js:381:25
					    at /home/jeshaitan/Personal/Scicademy/node_modules/mongodb/lib/db.js:245:5
					        at connectHandler (/home/jeshaitan/Personal/Scicademy/node_modules/mongodb/lib/server.js:294:7)
						    at g (events.js:261:16)
						        at emitOne (events.js:78:13)
							    at emit (events.js:170:7)
							        at /home/jeshaitan/Personal/Scicademy/node_modules/mongodb-core/lib/topologies/server.js:588:23
								    at /home/jeshaitan/Personal/Scicademy/node_modules/mongodb-core/lib/topologies/server.js:510:18
								    