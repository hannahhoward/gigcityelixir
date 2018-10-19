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
  Text,
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
  suptree: require("../assets/suptree.png"),
  techgirlwonder: require("../assets/techgirlwonder-01.png"),
  topgun: require("../assets/topgun.gif"),
  vogueing: require("../assets/vogueing.jpg"),
  win31: require("../assets/win31.png"),
  zoolander: require("../assets/zoolander.gif"),
  katniss: require("../assets/katniss.gif"),
};

preloader(images);

const theme = createTheme({
  primary: "#D46A6A",
  secondary: "#260339",
  tertiary: "#7585A9",
});

const darkTertiary = "#2C3F70";

const _alignCenter = {
  alignItems: "center",
  height: "550px",
  marginTop: "40px",
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
  stateNeedsMoreWork: `
    You could technically stop there. But we learn some more things...
  `,
  default: "",
};

const genServerClient = `
defmodule KV.Registry.Client do
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
end`

const genServerServer = `
defmodule KV.Registry.Server do
  use GenServer

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

const werewolfGameRoom = `
defmodule Werewolf.GameRoom do
  use Werewolf.Web, :model

  schema "gamerooms" do
    field :slug, :string

    timestamps
  end

  @required_fields ~w(slug)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the model and params.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
`;

const werewolfGame = `
defmodule Werewolf.Gameplay.Client do
  use GenServer

  # CLIENT
  def start_link(game_id) do
    GenServer.start_link(Werewolf.Gameplay.Server, game_id, name: ref(game_id))
  end

  def join(game_id, player_id, pid) do
    try_call(game_id, {:join, player_id, pid})
  end

  def start_game(game_id, pid) do
    try_call(game_id, {:start_game, pid})
  end

  defp ref(game_id), do: {:global, {:gameplay, game_id}}

  defp try_call(game_id, message) do
    case GenServer.whereis(ref(game_id)) do
      nil ->
        {:error, "Game does not exist"}
      pid ->
        GenServer.call(pid, message)
    end
  end
end`

const werewolfGameServer = `
defmodule Werewolf.Gameplay.Server do
  use GenServer
  defstruct [
    id: nil,
    game_started: false,
    players: []
  ]

  # SERVER
  def init(id) do
    {:ok, %__MODULE__{id: id}}
  end

  def handle_call({:join, player_id, pid}, _from, game) do
    updated_players = Enum.dedup(game.players ++ [player_id])
    game = %{game | players: updated_players}
    |> IO.inspect
    {:reply, {:ok, self}, game}
  end

  def handle_call({:start_game, pid}, _from, game) do
    new_game = %{game | game_started: true}
    |> IO.inspect
    {:reply, {:ok, self}, new_game}
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
              <Heading size={1} caps textColor={darkTertiary}>
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
                  <Image src={images.techgirlwonder.replace("/", "")} height="700px" margin="0px 40px 0px 0px" />
                </Appear>
              </Fit>
              <Fill>
                <Heading size={1} fit caps lineHeight={1} textColor={darkTertiary}>
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
            <Image src={images.poohbear.replace("/", "")} height="400px" />
            <Text>
              I like dogs
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="primary" notes="">
            <Heading size={1} fit caps textColor="secondary">
              This is a talk about Elixir and Phoenix
            </Heading>
            <Heading size={1} fit caps textColor={darkTertiary}>
              for languages switchers and mid level folks
            </Heading>
            <Appear>
              <Heading size={1} fit caps textColor="secondary">
                Goal: give you a new perspective
              </Heading>
            </Appear>
          </Slide>
          <Slide>
            <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Note To The Erlang Gods
            </Heading>
            <Image src={images.katniss.replace("/", "")} height="300px" margin="40px auto 0px"/>
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
              <Quote>
                "All that you touch You Change.
                <br />
                All that you Change Changes you.
                <br />
                The only lasting truthis Change.
                <br />
                God is Change."
              </Quote>
              <Cite>- Octavia Butler, Parable Of The Sower</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={1} fit caps textColor="primary">
              WTF talk did I just come too?
            </Heading>
            <Image src={images.zoolander.replace("/", "")} width="500px" margin="40px auto 0px" />
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
            <Image src={images.meangirls.replace("/", "")} height="500px" margin="40px auto 0px" />
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
            <Image src={images.firstWebsite.replace("/", "")} width="500px" margin="40px auto 0px" />
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
            <Heading size={4} caps textColor="primary">
              Managing state is really hard in a distributed system
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Managing state in a distributed sytem:
            </Heading>
            <Image src={images.marriedWithChildren.replace("/", "")} width="500px" margin="40px auto 0px" />
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
              Scalability bottle neck:             
            </Text>
            <Heading size={1} fit caps textColor="primary">
              The database
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Scalability bottle neck 2:             
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Realtime
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Reasons for this model:          
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Traditional programming languages?
            </Heading>
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
            <Image src={images.topgun.replace("/", "")} width="500px" margin="40px auto 0px" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Ericsson and the telephone switch problem
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Erlang Concurrency Part 1:            
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Actor Pattern
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              An application is composed of several actors
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              Actors are seperate from each other, can communicate through messages
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              Message passing is asychronous, but messages arrive in the order they're sent
            </Heading>
          </Slide>     
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Actor Pattern
            </Heading>
            <Image src={images.vogueing.replace("/", "")} width="500px" margin="40px auto 0px" />
            <Text textColor="tertiary">
              Serving OOP Realness since 1973
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Erlang Concurrency Solution #2:            
            </Text>
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
              Digression:           
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Preemptive vs coorporative scheduling
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.noOsConcurrency}>
            <Text textColor="tertiary">
              Why not delegate to the OS?          
            </Text>
            <Heading size={4} caps textColor="primary">
              OS processes = slow to create, lots of memory
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Image src={images.popquiz.replace("/", "")} width="500px" margin="40px auto 0px" />
            <Text textColor="tertiary">
              What programming language essentially implements a cooperative scheduling model inside the language?
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Preemptive Scheduling Bonus # 2:
            </Heading>
            <Image src={images.win31.replace("/", "")} width="500px" margin="40px auto 0px" />
            <Text textColor="tertiary">
              Fault tolerance
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              State Management In Erlang:           
            </Text>
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
              Processes have internal state
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.stateNeedsMoreWork}>
            <Heading size={4} caps textColor="primary">
              But it needs a bit more work...
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              OTP:         
            </Text>
            <Heading size={4} caps textColor="primary">
              A standard library on steroids that makes handling distributed state way easier!
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Image src={images.carnegieHall.replace("/", "")} height="500px" margin="40px auto 0px" />
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
              Behaviors:         
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Abstractions for writing processes that handle state       
            </Heading>   
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Most common behavior:    
            </Text>
            <Heading size={4} caps textColor="primary">
              GenServer is process that maintains a permaneant state over time     
            </Heading>    
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Two ways to talk to a Genserver
            </Text>
            <List textColor="primary">
              <ListItem>Send it a message expecting a reply (synchronous) - "CALL"</ListItem>
              <ListItem>Send asdfads mesage not expecting a reply (asynchronous) - "CAST"</ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Two Functions To Implement A GenServer
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} textColor="primary">
              handle_call
            </Heading>
            <Layout>
              <Fill>
                <Text textColor="tertiary">
                  Parameters:
                </Text>
                <List ordered textColor="primary">
                  <ListItem>
                    Message
                  </ListItem>
                  <ListItem>
                    Id of sender process
                  </ListItem>
                  <ListItem>
                    Current State of GenServer
                  </ListItem>
                </List>
              </Fill>
              <Fill>
                <Text textColor="tertiary">
                  Returns:
                </Text>
                <List ordered textColor="primary">
                  <ListItem>
                    Type Of Reply
                  </ListItem>
                  <ListItem>
                    Reply Data
                  </ListItem>
                  <ListItem>
                    New State of GenServer
                  </ListItem>
                </List>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              A GenServer in elixir:
            </Text>
            <CodePane lang="elixir" source={genServerServer} textSize="0.4em" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              A GenServer in Elixir (part 2):
            </Text>
            <CodePane lang="elixir" source={genServerClient} textSize="0.4em" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Elixir offers two even simpler versions GenServers
            </Text>
            <List textColor="primary">
              <ListItem>Task - I just wanna do some background processing</ListItem>
              <ListItem>Agent - I just wanna hold state over time</ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              OTP has other basic behaviors...
            </Text>
            <List textColor="primary">
              <ListItem>
                gen_fsm - For implementing finite-state machines (Old)
              </ListItem>
              <ListItem>
                gen_event - For implementing event handling functionality hold state over time
              </ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Image src={images.onemorething.replace("/", "")} width="500px" margin="40px auto 0px" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Supervisor:         
            </Text>
            <Heading size={1} fit caps textColor="primary">
              Special behavior to manage other behaviors     
            </Heading>   
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Supervisors have:
            </Text>
            <List textColor="primary">
              <ListItem>A list of child behaviors (i.e. GenServers, etc)</ListItem>
              <ListItem>Strategies for how to keep the children running (i.e. handling failure)</ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              Supervisors can have children that are themselves supervisors for other behaviors
            </Heading>    
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              Supervision Tree     
            </Heading>
            <Image src={images.suptree.replace("/", "")} width="500px" margin="40px auto 0px" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Supervisor example
            </Text>
            <CodePane lang="elixir" source={supervisor} textSize="0.4em" />
          </Slide>  
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              But that's not all...
            </Heading>    
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Other stuff in OTP
            </Text>
            <List textColor="primary">
              <ListItem>Real-time distributed databases</ListItem>
              <ListItem>Static code analyis (Dializer)</ListItem>
              <ListItem>Tools to communicate between servers seamlessly</ListItem>
              <ListItem>Tools to deploy new code without across multiple computers without taking the system down</ListItem>
              <ListItem>GUI tools to monitor all this</ListItem>
            </List>
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              OMG OMG OMG!
            </Heading>    
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              And now back to our original question...
            </Heading>    
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Layout>
              <Fit>
                <Image src={images.notYourFathersOldsmobile.replace("/", "")} height="500px" margin="40px auto 0px" />
              </Fit>
              <Fill>
                <BlockQuote>
                  <Quote>"It's not your fathers Erlang"</Quote>
                  <Cite>- future Elixir marketing campaign</Cite>
                </BlockQuote>
              </Fill>
            </Layout>
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              What about Phoenix?
            </Heading>    
          </Slide>   
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Phoenix:      
            </Heading>  
            <Text textColor="tertiary">
              An Elixir Web framework That Implements Standard Patterns Of Distributed Web Applications
            </Text>  
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Layout>
              <Fit>
                <Image src={images.mattdamon.replace("/", "")} height="500px" margin="40px auto 0px" />
              </Fit>
              <Fill>
                <BlockQuote>
                  <Quote>"New language, same web you love"</Quote>
                  <Cite>- future Phoenix marketing slogan</Cite>
                </BlockQuote>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              It's about to get complicated...   
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Layout>
              <Fit>
                <Image src={images.carrie.replace("/", "")} height="500px" margin="40px auto 0px" />
              </Fit>
              <Fill>
                <Heading size={4} caps textColor="primary">
                  You have another toolset as well with immense powers... 
                </Heading>
                <Appear>
                  <Text textColor="tertiary">
                    Be afraid, very afraid
                  </Text>
                </Appear>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              What's better than one monster truck?
            </Heading>
            <Image src={images.monstertrucks.replace("/", "")} width="600px" margin="40px auto 0px" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              And this is where we enter uncharted territory...
            </Heading>
            <Image src={images.starTrek.replace("/", "")} width="600px" margin="40px auto 0px" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              The Big Question:         
            </Text>
            <Heading size={4} caps textColor="primary">
              How do you mix a standard web distributed system with the Erlang VM / OTP distributed system?
            </Heading>   
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Text textColor="tertiary">
              Answer 1:
            </Text>
            <Heading size={4} caps textColor="primary">
              You're doing it already
            </Heading> 
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Text textColor="tertiary">
              Answer 2:
            </Text>
            <Heading size={4} caps textColor="primary">
              To do the stuff you normally do, only easier
            </Heading> 
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              An Elixir Package You Should Never See:
            </Heading>
            <Image src={images.sidekiqPro.replace("/", "")} width="600px" margin="40px auto 0px" />
          </Slide>          
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Text textColor="tertiary">
              Answer 3:
            </Text>
            <Heading size={4} caps textColor="primary">
              I have no freakin clue... but I have some ideas
            </Heading> 
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Text textColor="tertiary">
              Possible Rule 1:
            </Text>
            <Heading size={4} caps textColor="primary">
              If it's something real-time, don't use the database
            </Heading> 
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Werewolf Game:
            </Text>
            <Heading size={4} caps textColor="primary">
              Mixing PostGres and OTP
            </Heading>             
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Werewolf Gameroom Database Model
            </Text>
            <CodePane lang="elixir" source={werewolfGameRoom} textSize="0.4em" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Werewolf Game GenServer
            </Text>
            <CodePane lang="elixir" source={werewolfGameServer} textSize="0.4em" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              Werewolf Game GenServer Client
            </Text>
            <CodePane lang="elixir" source={werewolfGame} textSize="0.4em" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Heading size={1} fit caps textColor="primary">
              Possible Rule #2:
            </Heading>
            <Text textColor="tertiary">
              If it's stored distributed and has to scalre, don't use a relational database, use OTP (or Riak!)
            </Text> 
            <Appear>
              <Text textColor="tertiary">
                ... and don't bolt on MongoDB ...
              </Text>
            </Appear>
          </Slide>        
          <Slide transition={["slide"]} bgColor="black" notes={notes.onlyAlternative}>
            <Heading size={1} fit caps textColor="primary">
              Possible Rule #3:
            </Heading>
            <Text textColor="tertiary">
              If you can't do it with web tools, obviously use OTP
            </Text> 
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Heading size={1} fit caps textColor="primary">
              Cardinal Rule #1:
            </Heading>
            <Text textColor="tertiary">
              If you only know traditional web models...
            </Text> 
            <Appear>
              <Text textColor="tertiary">
                ...or only OTP...
              </Text>
            </Appear>
            <Appear>
              <Text textColor="tertiary">
                ...learn the other!
              </Text>
            </Appear>
          </Slide> 
          <Slide transition={["slide"]} bgColor="black" notes={notes.doingItAlready}>
            <Heading size={1} fit caps textColor="primary">
              Cardinal Rule #2:
            </Heading>
            <Text textColor="tertiary">
              Once you know both...
            </Text> 
            <Appear>
              <Text textColor="tertiary">
                ...Be creative...
              </Text>
            </Appear>
            <Appear>
              <Text textColor="tertiary">
                ...Discover new rules!
              </Text>
            </Appear>
          </Slide>    
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={1} fit caps textColor="primary">
              Origin Of This Talk
            </Heading>
            <Image src={images.ali.replace("/", "")} width="600px" margin="40px auto 0px" />
            <Text textColor="tertiary">
              A bit of overconfidence
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Text textColor="tertiary">
              This question is huge... 
            </Text>
            <Heading size={4} caps textColor="primary">
              We're all gonna figure it out together!
            </Heading>      
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              Good luck
            </Heading>
            <Image src={images.hansolo.replace("/", "")} width="600px" margin="40px auto 0px" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="">
            <Heading size={4} caps textColor="primary">
              http://elixir-otp-phoenix-presentation.techgirlwonder.com
            </Heading>
          </Slide>
        </Deck>     
      </Spectacle>
    );
  }
}
