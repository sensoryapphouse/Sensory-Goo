var that;
var symetry = false;
var colourSetting = 0;
var psd;

function TestDrawingParticles() {
    that = this;
    camera.position.y = 2;
    camera.position.z = 3.2;
    var METER = 100;
    var bd = new b2BodyDef;
    var ground = world.CreateBody(bd);
    this.boxLeft = -4.3;
    this.boxRight = 4.3;
    this.boxBottom = -0.25;
    this.boxTop = 10;
    this.useLinearImpulse = true;

    function createFixture() {
        var shape = new b2PolygonShape;
        shape.vertices.push(new b2Vec2(-4, -2));
        shape.vertices.push(new b2Vec2(4, -2));
        shape.vertices.push(new b2Vec2(4, 0));
        shape.vertices.push(new b2Vec2(-4, 0));
        ground.CreateFixtureFromShape(shape, 0.0);

        shape = new b2PolygonShape;
        shape.vertices.push(new b2Vec2(-4, -2));
        shape.vertices.push(new b2Vec2(-2, -2));
        shape.vertices.push(new b2Vec2(-2, 6));
        shape.vertices.push(new b2Vec2(-4, 6));

        ground.CreateFixtureFromShape(shape, 0.0);

        shape = new b2PolygonShape; // right
        shape.vertices.push(new b2Vec2(2., -2));
        shape.vertices.push(new b2Vec2(4, -2));
        shape.vertices.push(new b2Vec2(4, 10));
        shape.vertices.push(new b2Vec2(2, 10));
        //        ground.CreateFixtureFromShape(shape, 0.0);

        shape = new b2PolygonShape; // top
        shape.vertices.push(new b2Vec2(-10, this.boxTop));
        shape.vertices.push(new b2Vec2(10, this.boxTop));
        shape.vertices.push(new b2Vec2(10, this.boxTop + .1));
        shape.vertices.push(new b2Vec2(-10, this.boxTop + .1));
        ground.CreateFixtureFromShape(shape, 0.0);
    }
    //    createFixture();
    var shape = new b2ChainShape;
    shape.vertices.push(new b2Vec2(this.boxLeft, this.boxBottom));
    shape.vertices.push(new b2Vec2(this.boxRight, this.boxBottom));
    shape.vertices.push(new b2Vec2(this.boxRight, this.boxTop));
    shape.vertices.push(new b2Vec2(this.boxLeft, this.boxTop));

    //shape.vertices.push(new b2Vec2(this.boxLeft, this.boxBottom));
    shape.CreateLoop();

    ground.CreateFixtureFromShape(shape, 0.0);
    //  world.bodies.add(ground, false, 0x000000, true, 0x000000, 1 f);
    this.colorIndex = 0;
    psd = new b2ParticleSystemDef();
    psd.radius = 0.05;

    this.particleSystem = world.CreateParticleSystem(psd);
    this.lastGroup = null;
    this.drawing = false;

    this.particleFlags = 0;
    this.groupFlags = 0;
    resetToolbar();
    toolButtons[1].style.borderRadius = "3vh";
}

var e_parameterBegin = (1 << 31); // Start of this parameter namespace.
var e_parameterMove = e_parameterBegin | (1 << 0);
var e_parameterRigid = e_parameterBegin | (1 << 1);
var e_parameterRigidBarrier = e_parameterBegin | (1 << 2);
var e_parameterElasticBarrier = e_parameterBegin | (1 << 3);
var e_parameterSpringBarrier = e_parameterBegin | (1 << 4);
var e_parameterRepulsive = e_parameterBegin | (1 << 5);

/**@return number*/
TestDrawingParticles.prototype.DetermineParticleParameter = function () {
    if (this.drawing) {
        if (this.groupFlags === (b2_rigidParticleGroup |
                b2_solidParticleGroup)) {
            return e_parameterRigid;
        }
        if (this.groupFlags === b2_rigidParticleGroup &&
            this.particleFlags === b2_barrierParticle) {
            return e_parameterRigidBarrier;
        }
        if (this.particleFlags === (b2_elasticParticle | b2_barrierParticle)) {
            return e_parameterElasticBarrier;
        }
        if (this.particleFlags == (b2_springParticle | b2_barrierParticle)) {
            return e_parameterSpringBarrier;
        }
        if (this.particleFlags == (b2_wallParticle | b2_repulsiveParticle)) {
            return e_parameterRepulsive;
        }
        return this.particleFlags;
    }
    return e_parameterMove;
};

TestDrawingParticles.prototype.Keyboard = function (key) {
    //        this.drawing = key != 'X';
    //    this.particleFlags = 0;
    //    this.groupFlags = 0;
    switch (key) {
        case '0': // erase (good)
            var part = b2_zombieParticle;
            this.particleFlags = part;
            break;
        case '1': // wall (good)
            var part = b2_wallParticle;
            this.particleFlags = part;
            break;
        case '2': // elastic (good)
            var part = b2_elasticParticle;
            this.particleFlags = part;
            break;
        case '3': // repulsive (good)
            var part = b2_repulsiveParticle;
            this.particleFlags = part;
            break;
        case '4': // reset drawings good
            this.particleFlags = 0;
            break;
        case '5': // toggle powder
            var part = b2_powderParticle;
            this.particleFlags = part;
            break;
        case '6': // toggle spring
            var part = b2_springParticle;
            this.particleFlags = part;
            break;
        case '7': // toggle water
            var part = b2_waterParticle;
            this.particleFlags = part;
            break;
        case '8': // toggle rective
            var part = b2_reaactiveParticle;
            this.particleFlags = part;
            break;
        case 'E':
            this.particleFlags = b2_elasticParticle;
            this.groupFlags = b2_solidParticleGroup;
            break;
        case 'P':
            this.particleFlags = b2_powderParticle;
            break;
        case 'R':
            this.groupFlags = b2_rigidParticleGroup | b2_solidParticleGroup;
            break;
        case 'S':
            this.particleFlags = b2_springParticle;
            this.groupFlags = b2_solidParticleGroup;
            break;
        case 'T':
            this.particleFlags = b2_tensileParticle;
            break;
        case 'V':
            this.particleFlags = b2_viscousParticle;
            break;
        case 'W':
            this.particleFlags = b2_wallParticle;
            this.groupFlags = b2_solidParticleGroup;
            break;
        case 'B':
            this.particleFlags = b2_barrierParticle | b2_wallParticle;
            break;
        case 'H':
            this.particleFlags = b2_barrierParticle;
            this.groupFlags = b2_rigidParticleGroup;
            break;
        case 'N':
            this.particleFlags = b2_barrierParticle | b2_elasticParticle;
            this.groupFlags = b2_solidParticleGroup;
            break;
        case 'M':
            this.particleFlags = b2_barrierParticle | b2_springParticle;
            this.groupFlags = b2_solidParticleGroup;
            break;
        case 'F':
            this.particleFlags = b2_wallParticle | b2_repulsiveParticle;
            break;
        case 'C':
            this.particleFlags = b2_colorMixingParticle;
            break;
        case 'Z':
            this.particleFlags = b2_zombieParticle;
            break;
        case 'X':
            ResetWorld();
            testSwitch('TestDrawingParticles');
            break;
        default:
            this.particleFlags = 0;
            this.groupFlags = 0;
            break;
    }
};

var tmr;
TestDrawingParticles.prototype.MouseDown = function (p) {
    if (colourSetting == 0)
        that.colorIndex = nextColour;
    if (colourSetting == 1)
        that.colorIndex = (that.colorIndex + 1) % particleColors.length;
    if (colourSetting == 3) {
        that.colorIndex = (that.colorIndex + 1) % particleColors.length;
        tmr = setInterval(function () {
            that.colorIndex = (that.colorIndex + 1) % particleColors.length;
        }, 1000);
    }
    this.drawing = true;
    Draw(p);
};


function Draw(p) {
    if (that.drawing) {
        var shape = new b2CircleShape;
        shape.position = p;
        shape.radius = .05 * parseInt(sldwidth.value);
        var xf = new b2Transform;
        xf.SetIdentity();

        that.particleSystem.DestroyParticlesInShape(shape, xf);

        var joinGroup =
            that.lastGroup && that.groupFlags === that.lastGroup.GetGroupFlags();

        switch (colourSetting) {
            case 0:
                break;
            case 2:
                that.colorIndex = (that.colorIndex + 1) % particleColors.length;
                break;
        }
        //        if (!joinGroup) {
        //            that.colorIndex = (that.colorIndex + 1) % particleColors.length;
        //        }
        var pd = new b2ParticleGroupDef;
        pd.shape = shape;
        pd.flags = that.particleFlags;
        if ((that.particleFlags &
                (b2_wallParticle | b2_springParticle | b2_elasticParticle)) ||
            (that.particleFlags === (b2_wallParticle | b2_barrierParticle))) {
            pd.flags |= b2_reactiveParticle;
        }
        pd.groupFlags = that.groupFlags;
        pd.color = particleColors[that.colorIndex];
        if (that.lastGroup !== null) {
            pd.group = that.lastGroup;
        }
        that.lastGroup = that.particleSystem.CreateParticleGroup(pd);
        that.mouseTracing = false;
    }
}

TestDrawingParticles.prototype.MouseMove = function (p) {
    Draw(p);
};

//TestDrawingParticles.prototype.MouseMove = function (p) {
//    if (this.drawing) {
//        var shape = new b2CircleShape;
//        shape.position = p;
//        shape.radius = 0.2;
//        var xf = new b2Transform;
//        xf.SetIdentity();
//
//        this.particleSystem.DestroyParticlesInShape(shape, xf);
//
//        var joinGroup =
//            this.lastGroup && this.groupFlags === this.lastGroup.GetGroupFlags();
//        if (!joinGroup) {
//            this.colorIndex = (this.colorIndex + 1) % particleColors.length;
//        }
//        var pd = new b2ParticleGroupDef;
//        pd.shape = shape;
//        pd.flags = this.particleFlags;
//        if ((this.particleFlags &
//                (b2_wallParticle | b2_springParticle | b2_elasticParticle)) ||
//            (this.particleFlags === (b2_wallParticle | b2_barrierParticle))) {
//            pd.flags |= b2_reactiveParticle;
//        }
//        pd.groupFlags = this.groupFlags;
//        pd.color = particleColors[this.colorIndex];
//        if (this.lastGroup !== null) {
//            pd.group = this.lastGroup;
//        }
//        this.lastGroup = this.particleSystem.CreateParticleGroup(pd);
//        this.mouseTracing = false;
//    }
//};

TestDrawingParticles.prototype.MouseUp = function (p) {
    this.drawing = false;
    this.lastGroup = null;
    clearTimeout(tmr);
};

TestDrawingParticles.prototype.ParticleGroupDestroyed = function (group) {
    if (group === this.lastGroup) {
        this.lastGroup = null;
    }
};
