/** 
 * net 模块用于创建基于流的 TCP 或 IPC 的服务器（net.createServer()）与客户端（net.createConnection()）。
net模块是专门用于网络通信的模块，若当前的数据交互不通过HTTP协议，就可以使用net模块，如WebSocket。
HTTP协议本质上是以文本形式传输数据，它的传输数据量较大，而且它的传输需要二进制和文本之间进行转换和解析。
在nodejs中，HTTP模块是继承自net模块的
*/

/** 
 * OSI参考模型
 * OSI（Open System Interconnect），即开放式系统互联。 它是ISO（国际标准化组织）组织在1985年研究的网络互联模型。该体系结构标准定义了网络互联的七层框架（物理层、数据链路层、网络层、传输层、会话层、表示层和应用层），即OSI开放系统互连参考模型。在这一框架下进一步详细规定了每一层的功能，以实现开放系统环境中的互连性、互操作性和应用的可移植性。
 * OSI参考模型可以分为以下七层：

物理层 → 数据链路层 → 网络层（IP协议） → 传输层（TCP层） → 会话层 → 表现层 → 应用层（HTTP协议等）

OSI参考模型详细介绍如下：

第1层物理层：处于OSI参考模型的最底层。物理层的主要功能是利用物理传输介质为数据链路层提供物理连接，以便透明的传送比特流。常用设备有（各种物理设备）网卡、集线器、中继器、调制解调器、网线、双绞线、同轴电缆。

第2层数据链路层：在此层将数据分帧，并处理流控制。屏蔽物理层，为网络层提供一个数据链路的连接，在一条有可能出差错的物理连接上，进行几乎无差错的数据传输（差错控制）。本层指定拓扑结构并提供硬件寻址。常用设备有网桥、交换机；

第3层网络层：本层通过寻址来建立两个节点之间的连接，为源端的运输层送来的分组，选择合适的路由和交换节点，正确无误地按照地址传送给目的端的运输层。它包括通过互连网络来路由和中继数据 ；除了选择路由之外，网络层还负责建立和维护连接，控制网络上的拥塞以及在必要的时候生成计费信息。

第4层传输层：—常规数据递送－面向连接或无连接。为会话层用户提供一个端到端的可靠、透明和优化的数据传输服务机制。包括全双工或半双工、流控制和错误恢复服务；传输层把消息分成若干个分组，并在接收端对它们进行重组。不同的分组可以通过不同的连接传送到主机。这样既能获得较高的带宽，又不影响会话层。在建立连接时传输层可以请求服务质量，该服务质量指定可接受的误码率、延迟量、安全性等参数，还可以实现基于端到端的流量控制功能。

第5层会话层：在两个节点之间建立端连接。为端系统的应用程序之间提供了对话控制机制。此服务包括建立连接是以全双工还是以半双工的方式进行设置，尽管可以在层4中处理双工方式 ；会话层管理登入和注销过程。它具体管理两个用户和进程之间的对话。如果在某一时刻只允许一个用户执行一项特定的操作，会话层协议就会管理这些操作，如阻止两个用户同时更新数据库中的同一组数据。

第6层表示层：主要用于处理两个通信系统中交换信息的表示方式。为上层用户解决用户信息的语法问题。它包括数据格式交换、数据加密与解密、数据压缩与终端类型的转换。

第7层应用层：OSI中的最高层。为特定类型的网络应用提供了访问OSI环境的手段。应用层确定进程之间通信的性质，以满足用户的需要。应用层不仅要提供应用进程所需要的信息交换和远程操作，而且还要作为应用进程的用户代理，来完成一些为进行信息交换所必需的功能。它包括：文件传送访问和管理FTAM、虚拟终端VT、事务处理TP、远程数据库访问RDA、制造报文规范MMS、目录服务DS等协议；应用层能与应用程序界面沟通，以达到展示给用户的目的。 在此常见的协议有:HTTP，HTTPS，FTP，TELNET，SSH，SMTP，POP3等。
*/

/** 
 * OSI参考模型各层功能
 * (1)物理层(Physical Layer)

物理层是OSI参考模型的最低层，它利用传输介质为数据链路层提供物理连接。

它主要关心的是通过物理链路从一个节点向另一个节点传送比特流，物理链路可能是铜线、卫星、微波或其他的通讯媒介。

它关心的问题有：多少伏电压代表1？多少伏电压代表0？时钟速率是多少？采用全双工还是半双工传输？总的来说物理层关心的是链路的机械、电气、功能和规程特性。

(2)数据链路层(Data Link Layer)

数据链路层是为网络层提供服务的，解决两个相邻结点之间的通信问题，传送的协议数据单元称为数据帧。

数据帧中包含物理地址（又称MAC地址）、控制码、数据及校验码等信息。该层的主要作用是通过校验、确认和反馈重发等手段，将不可靠的物理链路转换成对网络层来说无差错的数据链路。

此外，数据链路层还要协调收发双方的数据传输速率，即进行流量控制，以防止接收方因来不及处理发送方来的高速数据而导致缓冲器溢出及线路阻塞。

(3)网络层(Network Layer)

网络层是为传输层提供服务的，传送的协议数据单元称为数据包或分组。

该层的主要作用是解决如何使数据包通过各结点传送的问题，即通过路径选择算法（路由）将数据包送到目的地。

另外，为避免通信子网中出现过多的数据包而造成网络阻塞，需要对流入的数据包数量进行控制（拥塞控制）。

当数据包要跨越多个通信子网才能到达目的地时，还要解决网际互连的问题。

(4)传输层(Transport Layer)

传输层的作用是为上层协议提供端到端的可靠和透明的数据传输服务，包括处理差错控制和流量控制等问题。

该层向高层屏蔽了下层数据通信的细节，使高层用户看到的只是在两个传输实体间的一条主机到主机的、可由用户控制和设定的、可靠的数据通路。

传输层传送的协议数据单元称为段或报文。

(5)会话层(Session Layer)

会话层主要功能是管理和协调不同主机上各种进程之间的通信（对话），即负责建立、管理和终止应用程序之间的会话。会话层得名的原因是它很类似于两个实体间的会话概念。例如，一个交互的用户会话以登录到计算机开始，以注销结束。

(6)表示层(Presentation Layer)

表示层处理流经结点的数据编码的表示方式问题，以保证一个系统应用层发出的信息可被另一系统的应用层读出。

如果必要，该层可提供一种标准表示形式，用于将计算机内部的多种数据表示格式转换成网络通信中采用的标准表示形式。

数据压缩和加密也是表示层可提供的转换功能之一。

(7)应用层(Application Layer)

应用层是OSI参考模型的最高层，是用户与网络的接口。

该层通过应用程序来完成网络用户的应用需求，如文件传输、收发电子邮件等
*/

/** 
 * TCP
 * TCP完成了OSI参考模型中的第四层传输层的功能，net模块简单来说就是TCP协议的node实现。

  TCP（Transmission Control Protocol 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由IETF的RFC 793定义。

  当应用层向TCP层发送用于网间传输的、用8位字节表示的数据流，TCP则把数据流分割成适当长度的报文段，最大传输段大小（MSS）通常受该计算机连接的网络的数据链路层的最大传送单元（MTU）限制。之后TCP把数据包传给IP层，由它来通过网络将包传送给接收端实体的TCP层。

  TCP为了保证报文传输的可靠 [1] ，就给每个包一个序号，同时序号也保证了传送到接收端实体的包的按序接收。然后接收端实体对已成功收到的字节发回一个相应的确认(ACK)；如果发送端实体在合理的往返时延(RTT)内未收到确认，那么对应的数据（假设丢失了）将会被重传。

  TCP的可靠性虽然很好，但它也因此牺牲了效率，它比较适合于传输文件等场景。如果在对可靠性要求不高，但对效率要求很高的场景，如视频直播等，就可以使用UDP。
*/

/** 
 * UDP
 * UDP 是User Datagram Protocol的简称， 中文名是用户数据报协议，是OSI（Open System Interconnection，开放式系统互联） 参考模型中一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务，IETF RFC 768是UDP的正式规范。UDP在IP报文的协议号是17。

  UDP报文没有可靠性保证、顺序保证和流量控制字段等，可靠性较差。但是正因为UDP协议的控制选项较少，在数据传输过程中延迟小、数据传输效率高，适合对可靠性要求不高的应用程序，如音频、视频和普通数据在传送时使用UDP较多，或者可以保障可靠性的应用程序，如DNS、TFTP、SNMP等。

  Nodejs也提供了UDP/Datagram模块，可以在需要使用UDP时调用。
*/