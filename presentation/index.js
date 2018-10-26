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
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";
import BlankSlide from "./slideTemplates/blank-slide.jsx";
import AboutMeSlide from "./slideTemplates/about-me-slide.jsx";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  ali: require("../assets/ali.jpg"),
  carnegieHall: require("../assets/carnegie-hall.jpg"),
  carrie: require("../assets/carrie.jpg"),
  complicated: require("../assets/complicated.png"),
  conflict: require("../assets/conflict.gif"),
  firstWebsite: require("../assets/first-website.png"),
  hansolo: require("../assets/hansolo.gif"),
  graham: require("../assets/graham.gif"),
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
  cheerleader: require("../assets/cheerleader.gif"),
  theymeet: require("../assets/theymeet.gif"),
  topgun: require("../assets/topgun.gif"),
  vogueing: require("../assets/vogueing.jpg"),
  win31: require("../assets/win31.png"),
  zoolander: require("../assets/zoolander.gif"),
  katniss: require("../assets/katniss.gif"),
  megancheer: require("../assets/Megan_cheer.gif"),
  kiss: require("../assets/kiss.gif"),
  intro: require("../assets/intro.jpg"),
  inception: require("../assets/inception.jpg")
};

preloader(images);

const theme = createTheme({
  primary: "#D46A6A",
  secondary: "#260339",
  tertiary: "#7585A9"
});

const darkTertiary = "#2C3F70";

const _alignCenter = {
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
    Most applications have to be "fast" in some sense, but fast in a web application means something specific. Namely,  
    web applications have to serve lots of people at once! We call the ability to manage doing many things at once concurrency
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
  vs: `
    For the first part of this talk, I want to look at the properties
    of web applications that make them unique, or perhaps different from say 
    a command line application
  `,
  default: ""
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
end`;

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
end`;

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
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <BlankSlide transition={["zoom", "fade"]} notes="">
          <Layout>
            <Fit>
              <Appear>
                <Image
                  src={images.techgirlwonder.replace("/", "")}
                  height="700px"
                  margin="0px 40px 0px 0px"
                />
              </Appear>
            </Fit>
            <Fill>
              <Heading
                size={1}
                fit
                caps
                lineHeight={1}
                textColor={darkTertiary}
              >
                @techgirlwonder #AboutMe
              </Heading>
              <List>
                <Appear>
                  <ListItem>Hannah Howard</ListItem>
                </Appear>
                <Appear>
                  <ListItem>Programmer / Not of note</ListItem>
                </Appear>
                <Appear>
                  <ListItem>hannah@carbonfive.com</ListItem>
                </Appear>
                <Appear>
                  <ListItem>Twitter above!</ListItem>
                </Appear>
              </List>
            </Fill>
          </Layout>
        </BlankSlide>
        <BlankSlide>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Obligatory Personal Anecdote
          </Heading>
          <Image src={images.poohbear.replace("/", "")} height="400px" />
          <Text textSize="3.82rem">I like dogs</Text>
        </BlankSlide>
        <BlankSlide>
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            #WontBeErased
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["zoom"]}>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            OTP And The Web
          </Heading>
          <Appear>
            <Heading size={1} caps textColor={darkTertiary}>
              A Love Story?
            </Heading>
          </Appear>
        </BlankSlide>
        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={4} caps textColor={darkTertiary}>
            Prologue
          </Heading>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Web Applications vs Everything Else
          </Heading>
          <Image
            src={images.intro.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.definitionFast}
        >
          <Heading size={1} fit={false} caps textColor="primary">
            Web Applications have a different definition of "fast"
          </Heading>
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.definitionWebApp}
        >
          <Heading size={1} fit={false} caps textColor="primary">
            Many users need many computers
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Distributed System:
          </Heading>
          <Text textSize="3.82rem" textColor="tertiary">
            A program that runs across many computers connected by a network
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Distributed System Problem #1:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Scalability
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            {" "}
            Theory:
          </Text>

          <Heading size={1} caps textColor="primary">
            Machines = Users Served * Some Constant Ratio
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Reality:
          </Text>
          <Heading size={1} caps textColor="primary">
            Machines = Exponential or geometric growth based on users
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Distributed System Problem #2:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Managing State
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            A application is stateful if the way you interact with it changes
            over time as your interactions influence the internal condition of
            the application
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            State:
          </Heading>
          <Text textSize="3.82rem" textColor="tertiary">
            The internal condition of an application
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Even more so:
          </Text>
          <Heading size={1} caps textColor="primary">
            Managing state is really hard in a distributed system
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Managing state in a distributed sytem:
          </Heading>
          <Image
            src={images.marriedWithChildren.replace("/", "")}
            width="500px"
            margin="40px auto 0px"
          />
          <Text textSize="3.82rem" textColor="tertiary">
            Why many marriages fail
          </Text>
        </BlankSlide>

        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={4} caps textColor={darkTertiary}>
            Act 1:
          </Heading>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            The Web
          </Heading>
          <Image
            src={images.cheerleader.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
          <BlockQuote>
            <Quote textColor={darkTertiary}>
              Just A Small Town Girl Living in Lonely World...
            </Quote>
          </BlockQuote>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            What is the Web Stack
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Constraint #1:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            HTTP as a "stateless" protocol
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Constraint #2:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Your server code is stateless
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Primary State Manager:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            The database
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Other Ways To Manage State
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">Session / Cookies</ListItem>
            <ListItem textSize="3.82rem">Key Value Stores</ListItem>
            <ListItem textSize="3.82rem">Caches</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes={notes.concurrencyOs}>
          <Text textSize="3.82rem" textColor="tertiary">
            Concurrency Solution #1:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Delegate to the operating system
          </Heading>
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.concurrencyBackground}
        >
          <Text textSize="3.82rem" textColor="tertiary">
            Concurrency Solution #2:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Delegate to background jobs
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Why it works:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            You can scale your server at least
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Scalability bottle neck:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            The database
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Scalability bottle neck 2:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Realtime
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Properties Of The Web Stack
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              State Delegated And Saved To Disk
            </ListItem>
            <ListItem textSize="3.82rem">
              Web Services Are Componentized And Disposable
            </ListItem>
            <ListItem textSize="3.82rem">Centralized + Star Topology</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={4} caps textColor={darkTertiary}>
            Act 2:
          </Heading>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            The OTP
          </Heading>
          <Image
            src={images.graham.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
          <BlockQuote>
            <Quote textColor={darkTertiary}>
              Just a city boi born and raised in South Detroit...
            </Quote>
          </BlockQuote>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Meanwhile...
          </Text>
          <Heading size={1} fit caps textColor="primary">
            back in the 80's...
          </Heading>
          <Image
            src={images.topgun.replace("/", "")}
            width="500px"
            margin="40px auto 0px"
          />
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Ericsson and the telephone switch problem
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Erlang Concurrency Part 1:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            Actor Pattern
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            An application is composed of several actors
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Actors are seperate from each other, can communicate through
            messages
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Message passing is asychronous, but messages arrive in the order
            they're sent
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Actor Pattern
          </Heading>
          <Image
            src={images.vogueing.replace("/", "")}
            width="500px"
            margin="40px auto 0px"
          />
          <Text textSize="3.82rem" textColor="tertiary">
            Serving OOP Realness since 1973
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Erlang Concurrency Solution #2:
          </Text>
          <Heading size={1} caps textColor="primary">
            A VM that replicates preemptive scheduling from an Operating System
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            In Erlang, actors = processes
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Preemptive Scheduling Bonus # 2:
          </Heading>
          <Image
            src={images.win31.replace("/", "")}
            width="500px"
            margin="40px auto 0px"
          />
          <Text textSize="3.82rem" textColor="tertiary">
            Fault tolerance
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            State Management In Erlang:
          </Text>
          <Heading size={1} fit caps textColor="primary">
            The OTP
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Erlang is functional, which makes state immutable
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Processes have internal state
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Behaviors:
          </Text>
          <Heading size={1} caps textColor="primary">
            Abstractions for writing processes that handle state
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Most common behavior:
          </Text>
          <Heading size={1} caps textColor="primary">
            GenServer is process that maintains a permaneant state over time
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Two ways to talk to a Genserver
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              Send it a message expecting a reply (synchronous) - "CALL"
            </ListItem>
            <ListItem textSize="3.82rem">
              Send a mesage not expecting a reply (asynchronous) - "CAST"
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Two Functions To Implement A GenServer
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={4} textColor="primary">
            handle_call
          </Heading>
          <Layout>
            <Fill>
              <Text textSize="3.82rem" textColor="tertiary">
                Parameters:
              </Text>
              <List ordered textColor="primary">
                <ListItem textSize="3.82rem">Message</ListItem>
                <ListItem textSize="3.82rem">Id of sender process</ListItem>
                <ListItem textSize="3.82rem">
                  Current State of GenServer
                </ListItem>
              </List>
            </Fill>
            <Fill>
              <Text textSize="3.82rem" textColor="tertiary">
                Returns:
              </Text>
              <List ordered textColor="primary">
                <ListItem textSize="3.82rem">Type Of Reply</ListItem>
                <ListItem textSize="3.82rem">Reply Data</ListItem>
                <ListItem textSize="3.82rem">New State of GenServer</ListItem>
              </List>
            </Fill>
          </Layout>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={4} textColor="primary">
            handle_cast
          </Heading>
          <Layout>
            <Fill>
              <Text textSize="3.82rem" textColor="tertiary">
                Parameters:
              </Text>
              <List ordered textColor="primary">
                <ListItem textSize="3.82rem">Message</ListItem>
                <ListItem textSize="3.82rem">Id of sender process</ListItem>
                <ListItem textSize="3.82rem">
                  Current State of GenServer
                </ListItem>
              </List>
            </Fill>
            <Fill>
              <Text textSize="3.82rem" textColor="tertiary">
                Returns:
              </Text>
              <List ordered textColor="primary">
                <ListItem textSize="3.82rem">New State of GenServer</ListItem>
              </List>
            </Fill>
          </Layout>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Two Simpler GenServers In Elixir
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              Task - I just wanna do some background processing
            </ListItem>
            <ListItem textSize="3.82rem">
              Agent - I just wanna hold state over time
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Supervisor:
          </Text>
          <Heading size={1} caps textColor="primary">
            Special behavior to manage other behaviors
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Supervisors have:
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              A list of child behaviors (i.e. GenServers, etc)
            </ListItem>
            <ListItem textSize="3.82rem">
              Strategies for how to keep the children running (i.e. handling
              failure)
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Supervisors can have children that are themselves supervisors for
            other behaviors
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Supervision Tree
          </Heading>
          <Image
            src={images.suptree.replace("/", "")}
            width="500px"
            margin="40px auto 0px"
          />
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Erlang Cluster:
          </Text>
          <Heading size={1} caps textColor="primary">
            Transparent communication between Erlang nodes
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Erlang Releases:
          </Text>
          <Heading size={1} caps textColor="primary">
            Release new code without taking the system down
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Other OTP Tools
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">ETS - caching</ListItem>
            <ListItem textSize="3.82rem">
              Mnesia - Distributed databases
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Properties Of The Erlang Stack
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              State Managed Directly And Kept In Memory
            </ListItem>
            <ListItem textSize="3.82rem">
              Integrated System That Emphasizes Long Term Uptime
            </ListItem>
            <ListItem textSize="3.82rem">
              No single point of failure, division of responsibility
            </ListItem>
            <ListItem textSize="3.82rem">Soft Real-Time</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={4} caps textColor={darkTertiary}>
            Act 3:
          </Heading>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Elixir + Phoenix = OTP + Web
          </Heading>
          <Image
            src={images.theymeet.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
          <BlockQuote>
            <Quote textColor={darkTertiary}>
              They took the midnight train going anywhere...
            </Quote>
          </BlockQuote>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Elixir Contains the Entire OTP, But Made Easier
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Phoenix:
          </Heading>
          <Text textSize="3.82rem" textColor="tertiary">
            An Elixir Web framework That Implements Standard Patterns Of
            Distributed Web Applications
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Web Stack + OTP
          </Heading>
          <Text textSize="3.82rem" textColor="tertiary">
            Two Great Tastes, Now Together For The First Time
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            What's better than one monster truck?
          </Heading>
          <Image
            src={images.monstertrucks.replace("/", "")}
            width="600px"
            margin="40px auto 0px"
          />
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Complementary Aspects Of OTP And The Web Stack
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              Web Is Simple, Reliable, Not Super Fast Deals With Long Term State
            </ListItem>
            <ListItem textSize="3.82rem">
              OTP Is More Complicated But Fast, Deals Well With Real Time, More
              Easily Scalable
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={4} caps textColor={darkTertiary}>
            Act 4:
          </Heading>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Challenges
          </Heading>
          <Image
            src={images.conflict.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
          <BlockQuote>
            <Quote textColor={darkTertiary}>
              Shadows searching in the night...
            </Quote>
          </BlockQuote>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Is it that simple?
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={4} textColor="primary">
            Contradictory Environments
          </Heading>
          <Layout>
            <Fill>
              <Text textSize="3.82rem" textColor="tertiary">
                Web
              </Text>
              <List ordered textColor="primary">
                <ListItem textSize="3.82rem">
                  Disposable Isolated Servers
                </ListItem>
                <ListItem textSize="3.82rem">Restarted Frequently</ListItem>
                <ListItem textSize="3.82rem">Possibly Containerized</ListItem>
              </List>
            </Fill>
            <Fill>
              <Text textSize="3.82rem" textColor="tertiary">
                OTP
              </Text>
              <List ordered textColor="primary">
                <ListItem textSize="3.82rem">
                  Durable Connected Servers
                </ListItem>
                <ListItem textSize="3.82rem">
                  Direct Access To Hardware
                </ListItem>
                <ListItem textSize="3.82rem">Specific Release Process</ListItem>
              </List>
            </Fill>
          </Layout>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            An Embarassment of Riches?
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">Two Awesomes Are Great!</ListItem>
            <ListItem textSize="3.82rem">But it's a lot to learn....</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={4} caps textColor={darkTertiary}>
            Act 5:
          </Heading>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            3 Solutions...
          </Heading>
          <Image
            src={images.megancheer.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
          <BlockQuote>
            <Quote textColor={darkTertiary}>Don't stop believing...</Quote>
          </BlockQuote>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Three Approaches
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              KISS: Web + OTP Under The Hood
            </ListItem>
            <ListItem textSize="3.82rem">All In On OTP</ListItem>
            <ListItem textSize="3.82rem">Exciting New Hybrids</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            OTP is complicated! I just want to dip my toes!
          </Heading>
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.doingItAlready}
        >
          <Text textSize="3.82rem" textColor="tertiary">
            Pssst...
          </Text>
          <Heading size={1} caps textColor="primary">
            You're doing it already
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            How Phoenix Uses OTP
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">Process Per Web Request</ListItem>
            <ListItem textSize="3.82rem">Channels + Presence</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            PSA: Don't Discount This Approach!
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Use Cases
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">Port Projects</ListItem>
            <ListItem textSize="3.82rem">Convince Adoption Skeptics</ListItem>
            <ListItem textSize="3.82rem">Hard Deployment Env</ListItem>
            <ListItem textSize="3.82rem">
              Real Time Needs Fit In Channels
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.doingItAlready}
        >
          <Text textSize="3.82rem" textColor="tertiary">
            Ideal Team
          </Text>
          <Heading size={1} caps textColor="primary">
            Small To Mid Size,
            <br /> Minimal OTP Experience, <br />
            Converting Rails App,
            <br />
            Get Speed Win And FP
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            I Write Erlang, I Just Want It On The Web!
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Phoenix (or Plug/Cowboy)
            <br /> as Thin Web Wrapper
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Use Cases
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              Large Mostly Real Time Highly Distributed Systems
            </ListItem>
            <ListItem textSize="3.82rem">Long Term Uptime</ListItem>
            <ListItem textSize="3.82rem">
              Have Total Control Over Deployment
            </ListItem>
            <ListItem textSize="3.82rem">
              Real Time Needs Fit In Channels
            </ListItem>
          </List>
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.doingItAlready}
        >
          <Text textSize="3.82rem" textColor="tertiary">
            Ideal Team
          </Text>
          <Heading size={1} caps textColor="primary">
            Veteran Erlang/OTP Devs,
            <br />
            Game Devs,
            <br /> Independent Consultants Maintaining Hardware
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            I want to explore uncharted territory!
          </Heading>
          <Image
            src={images.starTrek.replace("/", "")}
            width="600px"
            margin="40px auto 0px"
          />
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Question:
          </Text>
          <Heading size={1} caps textColor="primary">
            Can OTP Run On Standard Web Infra?
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Distributed Supervisors + Restarting Whole Nodes
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} caps textColor="primary">
            Talk Inception
          </Heading>
          <Layout>
            <Fit>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/nLApFANtkHs"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ margin: "40px 40px 0px 0px" }}
              />
            </Fit>
            <Fit>
              <Image
                src={images.inception.replace("/", "")}
                height="315px"
                margin="40px 0px 0px 0px"
              />
            </Fit>
          </Layout>
          <Text textSize="3.82rem" caps textColor="tertiary">
            ElixirConf 2018 - Docker and OTP Friends or Foes <br />- Daniel
            Azuma
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Writing New Erlang Clusters
          </Heading>
          <Text textSize="3.82rem" caps textColor="tertiary">
            <Link href="https://github.com/bitwalker/libcluster">
              https://github.com/bitwalker/libcluster
            </Link>
          </Text>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Is All State Permaneant?
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Catching With OTP?
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Heading size={1} fit caps textColor="primary">
            Database as Async Backup?
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} inverted notes="">
          <Text textSize="3.82rem" textColor="tertiary">
            Use Cases
          </Text>
          <List textColor="primary">
            <ListItem textSize="3.82rem">
              Apps With Mostly Web Patterns But Important Real Time Needs
            </ListItem>
            <ListItem textSize="3.82rem">Offer Compelling Advantages</ListItem>
            <ListItem textSize="3.82rem">Deploy On Web Infra</ListItem>
          </List>
        </BlankSlide>
        <BlankSlide
          transition={["slide"]}
          inverted
          notes={notes.doingItAlready}
        >
          <Text textSize="3.82rem" textColor="tertiary">
            Ideal Team
          </Text>
          <Heading size={1} caps textColor="primary">
            Enterprise,
            <br />
            Significant Budget,
            <br />
            Ready For Long Term Investment
          </Heading>
        </BlankSlide>
        <BlankSlide transition={["slide"]} notes={notes.vs}>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Fin.
          </Heading>
          <Image
            src={images.kiss.replace("/", "")}
            height="500px"
            margin="40px 00px 40px 0px"
          />
          <BlockQuote>
            <Quote textColor={darkTertiary}>
              It goes on and on and on and on
            </Quote>
          </BlockQuote>
          <Text textSize="3.82rem" textColor={darkTertiary}>
            <Link href="http://gigcityelixir.techgirlwonder.com">
              http://gigcityelixir.techgirlwonder.com
            </Link>
          </Text>
        </BlankSlide>
      </Deck>
    );
  }
}
