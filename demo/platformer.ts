class Player extends GameObject
{
    constructor() { super(); }

    //Public properties
    public velocity : Vector2 = Vector2.zero;
    public grounded : boolean = false;
}

//Consts
var Const = 
{
    GRAVITY : 1.0,
    FRICTION : 0.85,
    JUMP_HEIGHT : 12
}

//Player
let player : Player;

function Awake() 
{ 
    //Rendering
    Display.Create(800, 400); 
    Display.backgroundColour = Colour.magenta;

    player = new Player();
    player.transform.position = new Vector2(400, 200);
    player.renderer.size = new Vector2(20, 20);
    player.renderer.fillColour = Colour.white;
}

function Update() 
{
    Display.Clear();

    //Input
    if(Input.GetKey(Input.KeyCode.a)) { player.velocity.x -= 1; }
    if(Input.GetKey(Input.KeyCode.d)) { player.velocity.x += 1; }

    player.velocity.x *= Const.FRICTION;
    player.velocity.y += Const.GRAVITY;

    if(Input.GetKeyDown(Input.KeyCode.w) && player.grounded) { player.velocity.y -= Const.JUMP_HEIGHT; }

    //Apply the velocity
    player.transform.position.x += player.velocity.x;
    player.transform.position.y += player.velocity.y;

    //Collision detection (kinda)
    let playerSize : Vector2 = Vector2.Mul(player.transform.scale, player.renderer.size);

    if(player.transform.position.y > Display.height - (playerSize.y / 2)) 
    {
        //Resition of the Collision
        player.transform.position.y -= player.transform.position.y - (Display.height - (playerSize.y / 2)); //Delta
        player.grounded = true;
        player.velocity.y = 0;
    }
    else { player.grounded = false; }

    //Done
    Display.AddGameObject(player);
}

function LateUpdate() { Display.Update(); }

//Event listeners
Time.AddAwakeCallback(Awake); Time.AddUpdateCallback(Update); Time.AddLateUpdateCallback(LateUpdate);