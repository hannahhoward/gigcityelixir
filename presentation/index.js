// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fit,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  ali: require("../assets/ali.jpg"),
  carnegieHall: require("../assets/carnegie-hall.jpg"),
  carrie: require("../assets/carrie.jpg"),
  complicated: require("../assets/complicated.png"),
  firstWebsite: require("../assets/first-website.png"),
  hansolo: require("../assets/hansolo.gif"),
  marriedWithChildren: require("../assets/married-with-children.png"),
  mattdamon: require("../assets/mattdamon.jpg"),
  meangirls: require("../assets/meangirls.gif"),
  monstertrucks: require("../assets/monstertrucks.jpg"),
  notYourFathersOldsmobile: require("../assets/Not-Your-Fathers-Oldsmobile.jpg"),
  onemorething: require("../assets/onemorething.jpg"),
  poohbear: require("../assets/poohbear.jpg"),
  popquiz: require("../assets/popquiz.gif"),
  sidekiqPro: require("../assets/sidekiq-pro.png"),
  starTrek: require("../assets/star-trek.png"),
  suptree: require("../assets/suptree.gif"),
  techgirlwonder: require("../assets/techgirlwonder-01.png"),
  topgun: require("../assets/topgun.gif"),
  vogueing: require("../assets/vogueing.jpg"),
  win31: require("../assets/win31.png"),
  zoolander: require("../assets/zoolander.gif")
};

preloader(images);

const theme = createTheme({
  primary: "#D46A6A",
  secondary: "#260339",
  tertiary: "#4F628E"
});

const alignCenter = {
  alignItems: "center",
  height: "550px",
  marginTop: "40px"
};

const notes = {
  whoami: `
    I've been writing web apps for a bit...
  `,
  language: `
    It's aimed at people coming from Ruby, Python, PHP or other popular programming languages
  `,
  existingPerspective: `
    <ul>
       <li>I hear this line a lot cause it's particularly motivating people who are switch from Ruby.</li>
       <li>But it could easily be applied to Python & Jango, or PHP and whatever folks are using these days.</li>
       <li>Maybe you throw in a desire to do a more functional programming.</li>
       <li>Maybe a bit about concurrency.</li>
    </ul>
  `,
  itisfaster: `
    Caveat: but not exactly the fastest
  `,
  rewindFaster: `
    What does "faster" mean for a web application?
    Is it just fast processing? Aside from syntax, shouldn't we just write web applications in C?
  `,
  definitionFast: `
    Web applications have to lots of people at once! We call the ability to manage doing many things at once concurrency
  `,
  definitionWebApp: `
    To serve many people at once, a web application is spread across many computers over a network
    At it's most basic level, as server is one computer that sends HTML, and the user views it on a different computer called a browser
  `,
  stateNotCool: `
    <ul>
      <li>Everyone loves the idea of stateless everything</li>
      <li>Stateless components</li>
      <li>Stateless authentication</li>
      <li>No mutable state</li>
    </ul>
  `,
  hiddenSystem: `
    if you've done traditional web server programming (Ruby on Rails, Django, most PHP apps), you've been using an elaborate and well thought out method for building a distributed system
  `,
  concurrencyOs: `
    <ul>
      <li>Operating systems can run multiple programs at once, they call them processes -- they're really good at it</li>
      <li>Unfortunately, you don't have a lot of control with that.</li>
      <li>Moreover, when you programatically want do things in parallel you have to use threads. Threads pretty much such to manage, cause shared memory = locks</li>
      <li>Ruby is particularly not helpful in this department</li>
      <li>But no worries... at least you cah lots of processing handling web requests seperately</li>
    </ul>
  `,
  concurrencyBackground: `
    When you gotta do something other than a background job, you make a new process or thread to handle it... in Ruby we use the stuff like Sidekiq
  `,
  actorRealOop: `
    In some ways, the Actor Model is closer to the original model of theories of Object Oriented Program put forward by Alan Kay
  `,
  noOsConcurrency: `
    By integrating directly into the programming language, Erlang is able to massively lower time to create processes and the memory they consume
  `,
  supervisionTree: `
    We call the hierarchy tree of supervisors with children the supervision tree
    <br />All children behaviors that aren't supervisors we call workers
  `,
  doingItAlready: `
    New Phoenix features like Channels and Presence are built on top of OTP
  `,
  onlyAlternative: `
    Almost not existing web languages and frameworks support hot reloading, OTP does
  `,
  overconfidence: `
    I came up with the idea for this talk cause I thought I could answer this question -- who to mix OTP + Phoenix
    <br>As I wrote the talk, I realized I didn't even fully understand the problem
  `,
  default: ""
};

const genServer = `
defmodule KV.Registry do
  use GenServer

  ## Client API

  @doc """
  Starts the registry.
  """
  def start_link do
    GenServer.start_link(__MODULE__, :ok, [])
  end

  @doc """
  Looks up the bucket pid for name stored in server.

  Returns {:ok, pid} if the bucket exists, :error otherwise.
  """
  def lookup(server, name) do
    GenServer.call(server, {:lookup, name})
  end

  @doc """
  Ensures there is a bucket associated to the given name in server.
  """
  def create(server, name) do
    GenServer.cast(server, {:create, name})
  end

  ## Server Callbacks

  def init(:ok) do
    {:ok, %{}}
  end

  def handle_call({:lookup, name}, _from, names) do
    {:reply, Map.fetch(names, name), names}
  end

  def handle_cast({:create, name}, names) do
    if Map.has_key?(names, name) do
      {:noreply, names}
    else
      {:ok, bucket} = KV.Bucket.start_link
      {:noreply, Map.put(names, name, bucket)}
    end
  end
end
;
`;

const supervisor = `
defmodule KV.Supervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok)
  end

  def init(:ok) do
    children = [
      worker(KV.Registry, [KV.Registry])
    ]

    supervise(children, strategy: :one_for_one)
  end
end
`;

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} caps lineHeight={1} textColor="secondary">
              Stateful
            </Heading>
            <Appear>
              <Heading size={1} caps textColor="tertiary">
                Web
              </Heading>
            </Appear>
            <Appear>
              <Heading size={1} caps textColor="secondary">
                Applications
              </Heading>
            </Appear>
          </Slide>
         <Slide transition={["zoom", "fade"]} bgColor="primary" notes="">
            <Layout>
              <Fit>
                <Appear>
                  <Image src={images.techgirlwonder.replace("/", "")} height="700px" margin="0px 40px 0px 0px"/>
                </Appear>
              </Fit>
              <Fill>
                <Heading size={1} fit caps lineHeight={1}>
                  @techgirlwonder #AboutMe
                </Heading>
                <List>
                  <Appear><ListItem>Hannah Howard</ListItem></Appear>
                  <Appear><ListItem>Programmer/Not of note</ListItem></Appear>
                  <Appear><ListItem>hannah@techgirlwonder.com</ListItem></Appear>
                  <Appear><ListItem>Twitter above!</ListItem></Appear>
                </List>
              </Fill>
            </Layout>
          </Slide>
          <Slide>
            <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Obligatory Personal Anecdote
            </Heading>
                  <Image src={images.poohbear.replace("/", "")} height="400px"/>
                  <Text>
                    I like dogs
                  </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="primary" notes="">
            <Heading size={1} fit caps textColor="secondary">
              This is a talk about Elixir and Phoenix
            </Heading>
            <Heading size={1} fit caps textColor="tertiary">
              for languages switchers and mid level folks
            </Heading>
            <Appear>
              <Heading size={1} fit caps textColor="secondary">
                Goal: give you a new perspective
              </Heading>
            </Appear>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.existingPerspective}>
            <BlockQuote>
              <Quote>"I want to use Elixir and Phoenix cause it's just like Ruby and Rails but faster"</Quote>
              <Cite>- well known perspective for switching</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
               That's fine.
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.itisfaster}>
            <Heading size={1} fit caps textColor="primary">
               It is "faster"
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.rewindFaster}>
            <Heading size={3} fit caps textColor="primary">
               But let's rewind...
            </Heading>
            <Appear>
              <Heading size={1} fit caps textColor="primary">
                 What is "faster"?
              </Heading>
            </Appear>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.definitionFast}>
            <Heading size={1} fit caps textColor="primary">
              Web Applications have a different definition of "fast"
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={3} fit caps textColor="primary">
               But let's rewind further...
            </Heading>
            <Appear>
              <Heading size={1} fit caps textColor="primary">
                What is a web application?
              </Heading>
            </Appear>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.definitionWebApp}>
            <Heading size={1} fit caps textColor="primary">
              Many users need many computers
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Distributed System:
            </Heading>
            <Text textColor="tertiary">
               Program that runs across many computers connected by a network
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
               Distributed Systems Are Hard
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
                             Distributed System Problem #1:
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Scalability
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Theory: Machines = Users Served * Some Constant Ratio
            </Heading>
          </Slide>
         <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Reality w/o lots of work:
            </Text>
            <Heading size={4} caps textColor="primary">
Machines = Exponential or geometric growth based on users
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
                             Distributed System Problem #2:
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Managing State
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={3} fit caps textColor="primary">
               But let's rewind even further...
            </Heading>
            <Appear>
              <Heading size={1} fit caps textColor="primary">
                What is state?
              </Heading>
            </Appear>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <BlockQuote>
              <Quote>"All that you touch
You Change.
<br />
All that you Change
Changes you.
<br />
The only lasting truth
is Change.
<br />
God
is Change."</Quote>
              <Cite>- Octavia Butler</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={1} fit caps textColor="primary">
               WTF talk did I just come too?
            </Heading>
            <Image src={images.zoolander.replace("/", "")} width="500px" margin="40px auto 0px"/>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
               A application is stateful if the way you interact with it changes over time as your interactions influence the internal condition of the application
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} caps textColor="primary">
              State:
            </Heading>
            <Text textColor="tertiary">
              The internal condition of an application            
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.stateNotCool}>
            <Heading size={1} fit caps textColor="primary">
              States been getting a bad name these days...
            </Heading>
            <Image src={images.meangirls.replace("/", "")} height="500px" margin="40px auto 0px"/>
          </Slide>     
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              State is why web programmers have jobs
            </Heading>
          </Slide>           
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              A truly stateless web application
            </Heading>
            <Text textColor="tertiary">
               http://info.cern.ch/hypertext/WWW/TheProject.html
            </Text>
            <Image src={images.firstWebsite.replace("/", "")} width="500px" margin="40px auto 0px"/>
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              What we mean:
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Managing state is hard
            </Heading>
          </Slide>       
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Even more so:
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Managing state is really hard in a distributed system           
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Managing state in a distributed sytem:
            </Heading>
            <Image src={images.marriedWithChildren.replace("/", "")} width="500px" margin="40px auto 0px"/>
            <Text textColor="tertiary">
              Why many marriages fail
            </Text>
          </Slide>           
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              And that's what the rest of this talk is about...
            </Heading>
          </Slide>                  
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
                Distributed system models that are concurrent, scale well and manage state well
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Managing State In A Distributed System Model 1: 
            </Text>
            <Heading size={1} fit caps textColor="primary">
What we've always done
            </Heading>
          </Slide>     
          <Slide transition={["slide"]} bgColor="black" notes={notes.hiddenSystem}>
            <Heading size={1} fit caps textColor="primary">
You had a system, you just didn't know it
            </Heading>
          </Slide>     
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Constraint #1: 
            </Text>
            <Heading size={1} fit caps textColor="primary">
HTTP as a "stateless" protocol
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Constraint #2:
            </Text>
            <Heading size={1} fit caps textColor="primary">
Your server code is stateless
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Primary State Manager: 
            </Text>
            <Heading size={1} fit caps textColor="primary">
The database
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Secondary State Manager:
            </Text>
            <Heading size={1} fit caps textColor="primary">
Session / Cookies
            </Heading>
          </Slide>          
          <Slide transition={["slide"]} bgColor="black" notes={notes.concurrencyOs}>
            <Text textColor="tertiary">
Concurrency Solution #1:
            </Text>
            <Heading size={1} fit caps textColor="primary">
Delegate to the operating system            
</Heading>
          </Slide>    
          <Slide transition={["slide"]} bgColor="black" notes={notes.concurrencyBackground}>
            <Text textColor="tertiary">
Concurrency Solution #2:
            </Text>
            <Heading size={1} fit caps textColor="primary">
Delegate to background jobs           
</Heading>
          </Slide>    
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Why it works:
            </Text>
            <Heading size={1} fit caps textColor="primary">
You can scale your server at least
</Heading>
          </Slide>    
                    <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Scalability bottle neck:             </Text>
            <Heading size={1} fit caps textColor="primary">
The database</Heading>
          </Slide>   
                    <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Scalability bottle neck 2:             </Text>
            <Heading size={1} fit caps textColor="primary">
Realtime</Heading>
          </Slide>   
                              <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Reasons for this model:           </Text>
            <Heading size={1} fit caps textColor="primary">
Traditional programming languages?</Heading>
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Managing State In A Distributed System Model 2:
            </Text>
            <Heading size={1} fit caps textColor="primary">
The Erlang VM &amp; OTP
            </Heading>
          </Slide>  
          <Slide transition={["slide"]} bgColor="black" notes="">

            <Text textColor="tertiary">
              Meanwhile...  
 </Text>
            <Heading size={1} fit caps textColor="primary">
              back in the 80's...           
          </Heading>
            <Image src={images.topgun.replace("/", "")} width="500px" margin="40px auto 0px"/>
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
Ericsson and the telephone switch problem
            </Heading>
          </Slide>        
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Erlang Concurrency Part 1:            </Text>
            <Heading size={1} fit caps textColor="primary">
Actor Pattern
            </Heading>
          </Slide> 
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
Like the Objects in OOP, an Actor is the fundamental building block of an application
            </Heading>
          </Slide>            
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
Like an object, an actor can receive messages, and act on them
            </Heading>
          </Slide>            
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Key Difference #1:
            </Text>
            <List textColor="primary">
              <ListItem>In OOP objects are some isolated by the compiler through private members</ListItem>
              <ListItem>Actors are 100% isolated from each other.</ListItem>
            </List>
          </Slide>    
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Key Difference #2:
            </Text>
            <List textColor="primary">
              <ListItem>In OOP, message passing is sychronous -- you probably don't even call it message passing
</ListItem>
              <ListItem>In the actor pattern, message passing is asychronous, but messages arrive in the order they're sent</ListItem>
            </List>
          </Slide>    
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Serving OOP Realness 
          </Heading>
            <Image src={images.vogueing.replace("/", "")} width="500px" margin="40px auto 0px"/>
          </Slide>       
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Erlang Concurrency Solution #2:            </Text>
            <Heading size={1} fit caps textColor="primary">
A VM that replicates preemptive scheduling from an Operating System            
</Heading>
          </Slide>       
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
In Erlang, actors = processes
            </Heading>
          </Slide> 
 <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Digression:           </Text>
            <Heading size={1} fit caps textColor="primary">
Preemptive vs coorporative scheduling     
</Heading>
          </Slide>   
 <Slide transition={["slide"]} bgColor="black" notes={notes.noOsConcurrency}>
            <Text textColor="tertiary">
Why not delegate to the OS?          </Text>
            <Heading size={4} caps textColor="primary">
OS processes = slow to create, lots of memory
</Heading>
          </Slide>  
          <Slide transition={["slide"]} bgColor="black" notes="">

            <Image src={images.popquiz.replace("/", "")} width="500px" margin="40px auto 0px"/>
                        <Text textColor="tertiary">
What programming language essentially implements a cooperative scheduling model inside the language?

          </Text>
          </Slide>     
                    <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
Preemptive Scheduling Bonus # 2:
          </Heading>
            <Image src={images.win31.replace("/", "")} width="500px" margin="40px auto 0px"/>
                        <Text textColor="tertiary">
Fault tolerance

          </Text>
          </Slide>  
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
State Management In Erlang:           </Text>
            <Heading size={1} fit caps textColor="primary">
The OTP        
</Heading>
          </Slide>   
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
Erlang is functional, which makes state immutable     
</Heading>
          </Slide>    
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
State is tracked threw processes
</Heading>
          </Slide>  
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
But it needs a bit more work...
</Heading>
          </Slide>     
         <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
OTP:         </Text>
            <Heading size={4} caps textColor="primary">
A standard library on steroids that makes handling distributed state way easier!</Heading>
          </Slide>             
                    <Slide transition={["slide"]} bgColor="black" notes="">

            <Image src={images.carnegieHall.replace("/", "")} height="500px" margin="40px auto 0px"/>
                        <Text textColor="tertiary">
OTP is based on distributed system abstractions developed over 20 years of experience

          </Text>
          </Slide>  
          <Slide transition={["slide"]} bgColor="black" notes="">
            <BlockQuote>
              <Quote>"Well supply the abstractions, you supply the implementation!"</Quote>
              <Cite>- future Erlang/OTP marketing campaign</Cite>
            </BlockQuote>
          </Slide>  
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
What are the abstractions?
</Heading>
          </Slide>    
         <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Behaviors:         </Text>
            <Heading size={1} fit caps textColor="primary">
Abstractions for writing processes that handle state       </Heading>   </Slide>     
         <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Most common behavior:    </Text>
            <Heading size={4}caps textColor="primary">
GenServer is process that maintains a permaneant state over time     </Heading>    </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Two ways to talk to a Genserver
            </Text>
            <List textColor="primary">
              <ListItem>Send it a message expecting a reply (synchronous) - "CALL"</ListItem>
              <ListItem>Send a mesage not expecting a reply (asynchronous) - "CAST"</ListItem>
            </List>
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
A GenServer itself implements two functions:
            </Text>
            <List textColor="primary">
              <ListItem>handle_call - function that receives a message, and based on message returns a status (ok or error), reply to caller, and new version of state for GenServer
</ListItem>
              <ListItem>handle_cast - function that receives a message, and returns a new version of state for the GenServer
</ListItem>
            </List>
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
A GenServer in elixir:
</Text>
<CodePane lang="elixir" source={genServer} textSize="0.25em" />
          </Slide>            
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Elixir offers two even simpler versions GenServers
            </Text>
            <List textColor="primary">
              <ListItem>Task - I just wanna do some background processing</ListItem>
              <ListItem>Agent - I just wanna hold state over time
</ListItem>
            </List>
          </Slide>
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
OTP has other basic behaviors...
            </Text>
            <List textColor="primary">
              <ListItem>gen_fsm - For implementing finite-state machines (Old)
</ListItem>
              <ListItem>gen_event - 
 For implementing event handling functionality
 hold state over time
</ListItem>
            </List>
          </Slide>           
          <Slide transition={["slide"]} bgColor="black" notes="">
          
            <Image src={images.onemorething.replace("/", "")} width="500px" margin="40px auto 0px"/>
          </Slide>   
         <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Supervisor:         </Text>
            <Heading size={1} fit caps textColor="primary">
Special behavior to manage other behaviors     </Heading>   </Slide> 
           <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Supervisors have:
            </Text>
            <List textColor="primary">
              <ListItem>A list of child behaviors (i.e. GenServers, etc)

</ListItem>
              <ListItem>Strategies for how to keep the children running (i.e. handling failure)

</ListItem>
            </List>
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">

            <Heading size={4} caps textColor="primary">
Supervisors can have children that are themselves supervisors for other behaviors
     </Heading>    </Slide>    
             <Slide transition={["slide"]} bgColor="black" notes="">
                      <Heading size={4} caps textColor="primary">
Supervision Tree     </Heading>  
            <Image src={images.suptree.replace("/", "")} width="500px" margin="40px auto 0px"/>
          </Slide>            
            <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
Supervisor example
</Text>
<CodePane lang="elixir" source={supervisor} textSize="0.25em" />
          </Slide>                    
          {/*<Slide transition={["slide"]} bgColor="black">
             <Heading size={1} fit ca
             ps lineHeight={1}>
                I started in tech...
            </Heading>
            <Layout style={alignCenter}>
              <Fill>
                  <Image src={images.coding.replace("/", "")} width="100%" display="block"/>
              </Fill>
              <Fit>
                 <Image align="center center" src={images.arrow.replace("/", "")} width="200px" margin="0px 0px 0px 100px" display="block"/>
              </Fit>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
             <Heading size={1} fit caps lineHeight={1}>
                ...then worked in nonprofit...
            </Heading>
            <Layout style={alignCenter}>
              <Fill>
                  <Image src={images.nonprofit.replace("/", "")} width="100%" display="block"/>
              </Fill>
              <Fit>
                 <Image align="center center" src={images.arrow.replace("/", "")} width="200px" margin="0px 0px 0px 100px" display="block"/>
              </Fit>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
             <Heading size={1} fit caps lineHeight={1}>
                ...then community organizing...
            </Heading>
            <Layout style={alignCenter}>
              <Fill>
                  <Image src={images.genderJusticeLA.replace("/", "")} height="600px" display="block"/>
              </Fill>
              <Fit>
                 <Image align="center center" src={images.arrow.replace("/", "")} width="200px" margin="0px 0px 0px 100px" display="block"/>
              </Fit>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
             <Heading size={1} fit caps lineHeight={1}>
                ...then joined a vanguard...
            </Heading>
            <Layout style={alignCenter}>
              <Fill>
                  <Image src={images.vanguard.replace("/", "")} height="600px" display="block"/>
              </Fill>
              <Fit>
                 <Image align="center center" src={images.arrow.replace("/", "")} width="200px" margin="0px 0px 0px 100px" display="block"/>
              </Fit>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
             <Heading size={1} fit caps lineHeight={1}>
                ...got burnt out...
            </Heading>
            <Layout style={alignCenter}>
              <Fill>
                  <Image src={images.burnOut.replace("/", "")} width="100%" display="block"/>
              </Fill>
              <Fit>
                 <Image align="center center" src={images.arrow.replace("/", "")} width="200px" margin="0px 0px 0px 100px" display="block"/>
              </Fit>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.endJourney}>
             <Heading size={1} fit caps lineHeight={1}>
                ...and ended up back in tech.
            </Heading>
            <Layout style={alignCenter}>
              <Fit>
                 <Image align="center center" src={images.arrow.replace("/", "")} width="200px" margin="0px 100px 0px 0px" display="block"/>
              </Fit>
              <Fill>
                  <Image src={images.coding.replace("/", "")} width="100%" display="block"/>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={3} fit caps textColor="primary">
               So...
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              #CurrentMood
            </Heading>
            <Image src={images.ghostbusters.replace("/", "")} width="900px" margin="40px auto 0px"/>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={3} fit caps textColor="primary">
               Good News!
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={3} caps textColor="primary">
               Techies can help with....
            </Heading>
            <List textColor="tertiary">
              <Appear><ListItem>Privacy</ListItem></Appear>
              <Appear><ListItem>Online Infrastructure</ListItem></Appear>
              <Appear><ListItem>Resources!</ListItem></Appear>
              <Appear><ListItem>Hardware!</ListItem></Appear>
              <Appear><ListItem>Hacking?</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={1} fit caps textColor="primary">
               Everyone has a role to play
            </Heading>
            <Image src={images.andMyAxe.replace("/", "")} margin="100px auto 0px"/>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={1} fit caps textColor="primary">
               We can do it well or...<br />not.
            </Heading>
            <Image src={images.dontFuckItUp.replace("/", "")} width="900px" margin="40px auto 0px"/>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary" notes={notes.checkPrivilege}>
            <Heading size={3} fit caps textColor="black">
               Understanding Difference
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.interviewStory}>
            <Heading size={1} caps textColor="primary">
              Story: The Bizarre Interview And The Meeting After
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.interviewStoryLessons}>
            <Heading size={1} fit caps textColor="primary">
               Lessons
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.default}>
            <Heading size={1} caps textColor="primary">
               Learn Some Stuff
            </Heading>
            <Appear><Text caps textColor="tertiary">
               This is a big topic
            </Text></Appear>
            <Appear><Heading size={2} fit margin="20px 0px">
              <Link href="https://www.ashedryden.com/blog/the-101level-reader-books-to-help-you-better-understand-your-biases-and-the-lived-experiences">
                 Ashe Dryden Bias 101 Reading List
              </Link>
            </Heading></Appear>
            <Appear><Text caps textColor="tertiary">
               ...And Don't Miss...
            </Text></Appear>
            <Appear><List textColor="tertiary">
              <ListItem>Sister Outsider - Audre Lorde</ListItem>
              <ListItem>The New Jim Crow - Michelle Alexander</ListItem>
              <ListItem>Organizing for Social Change - Midwest Academy</ListItem>
              <ListItem>Race Matters - Cornel West</ListItem>
              </List>
              </Appear>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.default}>
            <Heading size={1} caps textColor="primary">
               Give Away Money!
            </Heading>
            <Heading size={1} caps textColor="tertiary">
               Resource Generation
            </Heading>
            <Heading size={2} fit>
              <Link href="https://resourcegeneration.org/">https://resourcegeneration.org/</Link>
            </Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary" notes={notes.default}>
            <Heading size={3} fit caps textColor="black">
               Listening To Needs
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.needsStories}>
            <Heading size={1} caps textColor="primary">
              Many Stories Of Techies Not Paying Attention
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.needsStoriesLessons}>
            <Heading size={1} fit caps textColor="primary">
               Lessons
            </Heading>
          </Slide>

          <Slide transition={["zoom", "fade"]} bgColor="primary" notes={notes.default}>
            <Heading size={3} fit caps textColor="black">
               Adjusting Expectations
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.privacyStory}>
            <Heading size={1} caps textColor="primary">
              Story: The Privacy Solution That Wasn't
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.privacyStoryLessons}>
            <Heading size={1} fit caps textColor="primary">
               Lessons
            </Heading>
          </Slide>

          <Slide transition={["zoom", "fade"]} bgColor="primary" notes={notes.default}>
            <Heading size={3} fit caps textColor="black">
               Sustained Commitment
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.driveByTechTeam}>
            <Heading size={1} caps textColor="primary">
              Story: The Drive-By Tech Team
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.driveByTechTeam}>
            <Heading size={1} fit caps textColor="primary">
               Lessons
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="black" notes={notes.goodTech}>
            <Heading size={1} caps textColor="primary">
               A Couple Successful Tech Stories
            </Heading>
          </Slide>

          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              Let's Discuss.
            </Heading>
          </Slide>
          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="black">
              The End
            </Heading>
            <Link href="http://socialjusticetech-presentation.techgirlwonder.com">
               http://socialjusticetech-presentation.techgirlwonder.com
            </Link>
          </Slide>*/}
        </Deck>
      </Spectacle>
    );
  }
}
