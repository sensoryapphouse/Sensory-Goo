/* Buttons
    1. Just paint, every click change colour
    2. Just paint, timed colour change with symetry
    3. Paint jelly
    4. Paint repulse
    5. Pallete painting
    6. Paleete with symetry and clear
    7. Palette, with symetry and clear, normal, solid, jelly, and sliders
    8. Full palette and toolbar
*/

var firstTime = true;
var canvas;
var panel;
var splash;
var crosshairs;
var home;
var button;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;

var size;
var colPick;
var pal = [];
var toolButtons = [];
var palette;
var toolbar;
var speed = 5;
var sldspeed;
var sldwidth;
var colorMode = 0;
var nextColour = 0;
var inMenu = true;
var bdy;

var currentTool = 0;

window.onload = () => {
    'use strict';
    //           if ('serviceWorker ' in navigator) {
    //               navigator.serviceWorker.register('./sw.js');
    //           }
    bdy = document.getElementById("body")
    panel = document.querySelector('panel');
    splash = document.querySelector('splash');
    crosshairs = document.querySelector('crosshairs');
    crosshairs.hidden = true;
    canvas = document.getElementById('canvas');
    palette = document.querySelector('palette');
    //    palette.hidden = true;
    toolbar = document.querySelector('toolbar');
    toolbar.hidden = false;
    home = document.querySelector('home');
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');
    button4 = document.querySelector('button4');
    button5 = document.querySelector('button5');
    button6 = document.querySelector('button6');
    button7 = document.querySelector('button7');
    home.onmousedown = function (e) {
        try {
            e.preventDefault();
            e.stopPropagation();
        } catch (e) {};
        showMenu();
        toolbar.hidden = false;
        palette.hidden = false;
        showPalette();
        panel.hidden = false;
        colourSetting = 0;
        home.style.left = "46vw";
        setSpeed(3);
        setWidth(3);
        that.particleFlags = 0;
        ResetWorld();
        testSwitch('TestDrawingParticles');
    }

    button.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(1);
    }
    button1.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(2);
    }

    button2.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(3);
    }

    button3.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(4);
    }
    button4.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(5);
    }
    button5.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(6);
    }
    button6.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(7);
    }
    button7.onmousedown = function (e) {
        e.preventDefault();
        e.stopPropagation();
        start(8);
    }

    init();

    sldspeed = document.createElement("INPUT");
    sldspeed.setAttribute("type", "range");
    sldspeed.style.position = "absolute";
    sldspeed.style.height = ".5vh";
    sldspeed.style.width = "13vw";
    sldspeed.style.left = "2vw";
    sldspeed.style.top = "2.25vh";
    sldspeed.style.color = 'royalblue';
    sldspeed.value = 25;
    sldspeed.id = "speed";
    sldspeed.min = 1;
    sldspeed.max = 5;
    sldspeed.style.webkitAppearance = "none";
    sldspeed.style.background = "royalblue";
    panel.appendChild(sldspeed);
    sldwidth = document.createElement("INPUT");
    sldwidth.setAttribute("type", "range");
    sldwidth.style.position = "absolute";
    sldwidth.style.height = ".5vh";
    sldwidth.style.width = "13vw";
    sldwidth.style.left = "20.3vw";
    sldwidth.style.top = "2.25vh";
    sldwidth.style.color = 'royalblue';
    sldwidth.value = 3;
    sldwidth.id = "width";
    sldwidth.min = 1;
    sldwidth.max = 5;
    sldwidth.style.webkitAppearance = "none";
    sldwidth.style.background = "royalblue";
    panel.appendChild(sldwidth);
    sldspeed.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        speed = Math.pow(3, 6 - parseInt(sldspeed.value)) - 2;
        world.SetGravity(new b2Vec2(0, -9.81 / speed));
    }
    sldwidth.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation()
    }
    panel.onmousemove = function (e) {
        e.stopPropagation()
    }
    toolbar.onmousedown = function (e) {
        if (currentSet == 8) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    var offset = 0;
    for (var i = 0; i < 8; i++) {
        if (i > 0)
            offset = 1.5;
        if (i > 6)
            offset = 3;
        toolButtons[i] = document.createElement("BTN");
        toolButtons[i].style.position = "absolute";
        toolButtons[i].style.height = "10vh";
        toolButtons[i].style.width = "6vw";
        toolButtons[i].style.left = "1vw";
        toolButtons[i].style.top = i * 11.8 + offset + 2 + "vh";
        toolButtons[i].style.borderStyle = 'outset';
        toolButtons[i].style.backgroundSize = "100% 100%";
        var s = 'url(t' + (i).toString() + '.jpg)';
        toolButtons[i].style.backgroundImage = s;
        toolButtons[i].style.backgroundColor = 'white';
        toolButtons[i].style.borderRadius = "0vh";
        toolButtons[i].index = i;
        toolbar.appendChild(toolButtons[i]);

        toolButtons[i].onmousedown = function (e) {
            try {
                e.preventDefault();
                e.stopPropagation();
            } catch (e) {};
            resetToolbar();
            if (e.currentTarget.index > 0 && e.currentTarget.index < 7) {
                currentTool = e.currentTarget.index
                toolButtons[e.currentTarget.index].style.borderRadius = "3vh";
            }
            if (that.particleFlags == b2_zombieParticle && e.currentTarget.index != 6) {
                nextColour = 0;
                pal[0].style.borderRadius = '4vh';
            }
            switch (e.currentTarget.index) {
                case 0:
                    symetry = !symetry;
                    if (symetry)
                        toolButtons[0].style.borderRadius = "3vh";
                    else
                        toolButtons[0].style.borderRadius = "0vh";
                    break;
                case 1: // normal mode
                    that.particleFlags = 0;
                    break;
                case 2: // wall
                    that.particleFlags = b2_wallParticle;
                    break;
                case 3: // elastic (good)
                    that.particleFlags = b2_elasticParticle;
                    break;
                case 4: // repulsive (good)
                    that.particleFlags = b2_repulsiveParticle;
                    break;
                case 5: // colour mix
                    that.particleFlags = b2_colorMixingParticle;
                    break;
                case 6:
                    if (that.particleFlags != b2_zombieParticle)
                        resetStyles();
                    that.particleFlags = b2_zombieParticle;
                    break;
                case 7: // clear
                    var tmp = that.particleFlags;
                    ResetWorld();
                    testSwitch('TestDrawingParticles');
                    that.particleFlags = tmp;
                    resetToolbar();
                    if (symetry)
                        toolButtons[0].style.borderRadius = "3vh";
                    else
                        toolButtons[0].style.borderRadius = "0vh";
                    toolButtons[currentTool].style.borderRadius = "3vh";
                    //                    toolButtons[e.currentTarget.index].style.borderRadius = "0vh";
                    break;
            }
        }
        toolButtons[i].onmouseup = function () {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}

function hideButtons(j) {
    switch (j) {
        case 0:
            for (i = 0; i < 7; i++)
                toolButtons[i].hidden = true;
            break;
        case 1:
            toolButtons[0].hidden = false;
            for (i = 1; i < 7; i++)
                toolButtons[i].hidden = true;
            break;
        case 2:
            for (i = 0; i < 4; i++)
                toolButtons[i].hidden = false;
            for (i = 4; i < 7; i++)
                toolButtons[i].hidden = true;
            break;
        case 3:
            for (i = 0; i < 8; i++)
                toolButtons[i].hidden = false;
    }
}

function hidePalette(j) {
    for (i = 0; i < 10; i++)
        pal[i].hidden = true;
}

function showPalette() {
    for (i = 0; i < 10; i++)
        pal[i].hidden = false;
}

function setSpeed(i) {
    sldspeed.value = i;
    speed = Math.pow(3, 6 - parseInt(sldspeed.value)) - 2;
    world.SetGravity(new b2Vec2(0, -9.81 / speed));
}

function setWidth(i) {
    sldwidth.value = i;
}

var currentSet = 0;

function start(i) {

    currentSet = i;
    symetry = false;
    switch (i) {
        case 1: // Just paint, every click change colour
            hideButtons(0);
            hidePalette();
            //            palette.hidden = true;
            panel.hidden = true;
            colourSetting = 1;
            home.style.left = "1vw";
            break;
        case 2: // Just paint, timed colour change with symetry
            hideButtons(0);
            hidePalette();
            //            palette.hidden = true;
            panel.hidden = true;
            colourSetting = 3;
            symetry = true;
            home.style.left = "1vw";
            break;
        case 3: // Paint jelly
            that.particleFlags = b2_elasticParticle;
            hideButtons(0);
            hidePalette();
            //            palette.hidden = true;
            panel.hidden = true;
            colourSetting = 1;
            home.style.left = "1vw";
            break;
        case 4: // Paint repulse
            that.particleFlags = b2_repulsiveParticle;
            hideButtons(0);
            hidePalette();
            //            palette.hidden = true;
            panel.hidden = true;
            colourSetting = 1;
            home.style.left = "1vw";
            break;
        case 5: // Pallete painting
            that.particleFlags = 0;
            hideButtons(0);
            palette.hidden = false;
            panel.hidden = true;
            colourSetting = 0;
            home.style.left = "46vw";
            break;
        case 6: // Paleete with symetry and clear
            that.particleFlags = 0;
            hideButtons(1);
            palette.hidden = false;
            panel.hidden = true;
            colourSetting = 0;
            home.style.left = "46vw";
            break;
        case 7: // Palette, with symetry and clear, normal, solid, jelly, and sliders
            that.particleFlags = 0;
            hideButtons(2);
            palette.hidden = false;
            panel.hidden = false;
            colourSetting = 0;
            home.style.left = "46vw";
            break;
        case 8: // All
            that.particleFlags = 0;
            hideButtons(3);
            palette.hidden = false;
            panel.hidden = false;
            colourSetting = 0;
            home.style.left = "46vw";
            break;
    }
    hideMenu();

}


function hideMenu() {
    splash.hidden = true;
    button.hidden = true;
    button1.hidden = true;
    button2.hidden = true;
    button3.hidden = true;
    button4.hidden = true;
    button5.hidden = true;
    button6.hidden = true;
    button6.hidden = true;
    button7.hidden = true;
    home.hidden = false;
    inMenu = false;
}

function showMenu() {
    splash.hidden = false;
    button.hidden = false;
    button1.hidden = false;
    button2.hidden = false;
    button3.hidden = false;
    button4.hidden = false;
    button5.hidden = false;
    button6.hidden = false;
    button6.hidden = false;
    button7.hidden = false;
    panel.hidden = true;
    home.hidden = true;
    inMenu = true;
}

function resetToolbar() {
    for (var j = 1; j < 8; j++) {
        toolButtons[j].style.borderRadius = "0vh";
    }
}

function resetStyles() {
    for (var j = 0; j < 10; j++) {
        pal[j].style.borderRadius = "0vh";
    }
    if (that.particleFlags == b2_zombieParticle) {
        that.particleFlags = 0;
        toolButtons[6].style.borderRadius = "0vh";
        toolButtons[1].style.borderRadius = "3vh";
    }
}

function createPalette() {
    for (var i = 0; i < 10; i++) {
        pal[i] = document.createElement("BTN");
        pal[i].style.position = "absolute";
        pal[i].style.height = "8vh";
        pal[i].style.width = "6vw";
        pal[i].style.left = ".75vw";
        pal[i].style.top = 2 + i * 9.8 + "vh";
        pal[i].style.borderStyle = 'outset';
        pal[i].style.borderRadius = "0vh";
        var s = 'url(' + (i + 1).toString() + '.png)';
        pal[i].style.backgroundImage = s;
        pal[i].style.backgroundSize = "100% 100%";
        pal[i].index = i;

        palette.appendChild(pal[i]);

        palette.onmousedown = function (e) {
            try {
                e.preventDefault();
                e.stopPropagation()
            } catch (e) {}
            that.colorIndex = 2;
        }


        pal[i].onmousedown = function (e) {
            resetStyles();
            nextColour = e.currentTarget.index;
            //            e.currentTarget.style.borderStyle = 'inset';
            e.currentTarget.style.borderRadius = '4vh';
        }
    }
    pal[0].style.borderRadius = "4vh";
    setPaletteColours();
}

function setPaletteColours() {
    pal[0].style.backgroundColor = '#ff0000';
    pal[1].style.backgroundColor = '#ff8c00';
    pal[2].style.backgroundColor = '#ffd700';
    pal[3].style.backgroundColor = '#00af00';
    pal[4].style.backgroundColor = '#0000af';
    pal[5].style.backgroundColor = '#4b0082';
    pal[6].style.backgroundColor = '#ff00ff';
    pal[7].style.backgroundColor = '#00ffff';
    pal[8].style.backgroundColor = '#dfdfdf';
    pal[9].style.backgroundColor = '#000000';
    //    colPick.style.left = "10%";
}

var particleColors = [
    new b2ParticleColor(0xff, 0x00, 0x00, 0xff), // red
    new b2ParticleColor(0xff, 0x8c, 0x00, 0xff), // orange
    new b2ParticleColor(0xff, 0xd7, 0x00, 0xff), // gold
    new b2ParticleColor(0x00, 0xaf, 0x00, 0xaf), // green
    new b2ParticleColor(0x00, 0x00, 0xaf, 0xaf), // blue
    new b2ParticleColor(0x4b, 0x00, 0x82, 0xff), // indigo
    new b2ParticleColor(0xff, 0x00, 0xff, 0xff), // magenta
    new b2ParticleColor(0x00, 0xdf, 0xdf, 0xff), // cyan
    new b2ParticleColor(0xdf, 0xdf, 0xdf, 0xdf), // white
    new b2ParticleColor(0x00, 0x00, 0x00, 0xff) // black
];

var world = null;

var renderer, camera, target, scene, blobEffect, baseGroup, extraGroup;
var vsize = {
    w: window.innerWidth,
    h: window.innerHeight
}
var particlesCloud;
var liquidRender;
var objects = [];
var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var test = {};
var mouseJoint = null;

//        var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
//        var g_groundBody = null;

function printErrorMsg(msg) {
    //            var domElement = document.createElement('div');
    // domElement.style.textAlign = 'center';
    // domElement.innerHTML = msg;
    // document.body.appendChild(domElement);
};

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    target = new THREE.Vector3();


    try {
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            precision: "mediump",
            antialias: true,
            alpha: true
        });
    } catch (error) {
        printErrorMsg('<p>Sorry, your browser does not support WebGL.</p>' +
            '<p>This testbed application uses WebGL to quickly draw' +
            ' LiquidFun particles.</p>' +
            '<p>LiquidFun can be used without WebGL, but unfortunately' +
            ' this testbed cannot.</p>' +
            '<p>Have a great day!</p>');
        return;
    }

    //renderer.setClearColor(0xFF292e);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    scene = new THREE.Scene();

    baseGroup = new THREE.Group();
    extraGroup = new THREE.Group();
    scene.add(baseGroup);
    scene.add(extraGroup);

    //camera.lookAt(scene.position);
    target.copy(scene.position);
    camera.lookAt(target);


    blobEffect = new BlobEffect();

    this.mouseJoint = null;

    // hack
    liquidRender = new LiquidRender();
    var gravity = new b2Vec2(0, -10);
    world = new b2World(gravity, true);


    createPalette();
    Testbed();

    this.interval = setTimeout(function () {
        testSwitch('TestDrawingParticles');
    }, 500);
}

function testSwitch(testName) {
    //            location.hash = startTest;
    ResetWorld();
    world.SetGravity(new b2Vec2(0, -9.81 / speed)); // Set speed here
    //            var bd = new b2BodyDef;
    // g_groundBody = world.CreateBody(bd);
    test = new window['TestDrawingParticles'];
}

function Testbed() {
    // Init world
    var that = this;

    document.addEventListener('keydown', function (e) {
        //                if (editor.isFocus) return;
        e.preventDefault();
        if (e.keyCode == 27) {
            testSwitch('TestDrawingParticles');
            return;
        }
        if (test.Keyboard !== undefined) test.Keyboard(String.fromCharCode(e.which || e.keyCode), e.which || e.keyCode);
    });
    document.addEventListener('keyup', function (e) {
        //                if (editor.isFocus) return;
        e.preventDefault();
        if (test.KeyboardUp !== undefined) test.KeyboardUp(String.fromCharCode(e.which || e.keyCode), e.which || e.keyCode);
    });

    canvas.addEventListener('mouseup', function (e) {
        msUp(e);
    });

    window.addEventListener('resize', resize, false);
    resize();

    render();
}


function msDown(p) {
    var aabb = new b2AABB();
    aabb.lowerBound.Set(p.x - 0.001, p.y - 0.001);
    aabb.upperBound.Set(p.x + 0.001, p.y + 0.001);
    //var d = new b2Vec2(0.01, 0.01);

    //b2Vec2.Sub(aabb.lowerBound, p, d);
    //b2Vec2.Add(aabb.upperBound, p, d);

    var queryCallback = new QueryCallback(p);
    world.QueryAABB(queryCallback, aabb);


    if (test.MouseDown !== undefined) test.MouseDown(p, queryCallback);
    else {
        if (queryCallback.fixture && !firstTime) {
            var body = queryCallback.fixture.body;

            that.mouseJoint = world.addJoint({
                type: 'mouse',
                visible: true,
                bodyA: g_groundBody,
                bodyB: body,
                target: p,
                maxForce: 1000 * body.GetMass()
            });

            body.SetAwake(true);
        }
    }
}

function doMouse(p) {
    if (splash.hidden) {
        msDown(p);
        if (symetry) {
            p = getMouseCoords(window.innerWidth - e.clientX, e.clientY);
            msMove(p);
        }
    }
}

document.addEventListener('mousedown', function (e) {
    var p = getMouseCoords(e.clientX, e.clientY);
    doMouse(p);
});

function msMove(p) {
    if (that.mouseJoint) {
        that.mouseJoint.SetTarget(p);
        that.mouseJoint.target = p;
    }
    if (test.MouseMove !== undefined) test.MouseMove(p);
}
document.addEventListener('mousemove', function (e) {
    var p = getMouseCoords(e.clientX, e.clientY);
    msMove(p);
    if (symetry) {
        p = getMouseCoords(window.innerWidth - e.clientX, e.clientY);
        msMove(p);
    }
});

document.addEventListener('touchstart', function (e) {
    var p = getMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
    doMouse(p);
});
document.addEventListener('touchmove', function (e) {
    var p = getMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
    msMove(p);
    if (symetry) {
        p = getMouseCoords(window.innerWidth - e.touches[0].clientX, e.touches[0].clientY);
        msMove(p);
    }
});
document.addEventListener('touchend', function (e) {
    var p = getMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
    msUp(e.touches[0]);
});


function msUp(e) {
    if (that.mouseJoint != undefined)
        if (that.mouseJoint !== null) {
            world.DestroyJoint(that.mouseJoint);
            that.mouseJoint = null;
        }
    if (test.MouseUp !== undefined) test.MouseUp(getMouseCoords(e));
}


var follow = function (pos) {
    var z = camera.position.z;
    camera.position.set(pos.x, pos.y, z);
    //target.set(pos.x, pos.y,0);
}

var render = function () {
    // bring objects into world
    liquidRender.currentVertex = 0;
    if (test.Step !== undefined) test.Step();
    else Step();

    renderer.clear();

    liquidRender.draw();

    if (blobEffect.isActive) blobEffect.render();
    //else renderer.render(scene, camera);
    //            this.interval = setTimeout(function() {
    requestAnimationFrame(render);
    //            }, 10);
};

var ClearForces = function () {
    if (world !== null) {
        var i;

        /* i = world.joints.length;
         while ( i--) { if(world.joints[i].SetMotorSpeed) world.joints[i].SetMotorSpeed(0); }*/
        i = world.bodies.length
        var direction = new b2Vec2();
        while (i--) {
            world.bodies[i].ApplyForce(direction, world.bodies[i].GetPosition());
            world.bodies[i].ApplyTorque(0);
        }
    }
}

var ResetWorld = function () {
    if (world !== null) {
        while (world.joints.length > 0) {
            world.DestroyJoint(world.joints[0]);
        }
        while (world.bodies.length > 0) {
            world.DestroyBody(world.bodies[0]);
        }
        while (world.particleSystems.length > 0) {
            world.DestroyParticleSystem(world.particleSystems[0]);
        }
    }
    camera.position.set(0, 10, 20);
    camera.lookAt(new THREE.Vector3(0, 10, 0));
    //            tell('');

};

var Step = function () {
    world.Step(timeStep, velocityIterations, positionIterations);
};

function QueryCallback(point) {
    this.point = point;
    this.fixture = null;
};

QueryCallback.prototype.ReportFixture = function (fixture) {
    var body = fixture.body;
    var inside = fixture.TestPoint(this.point);
    if (inside) {
        this.fixture = fixture;
        return true;
    }
    return false;
};


function resize() {
    vsize.w = window.innerWidth;
    vsize.h = window.innerHeight;
    camera.aspect = vsize.w / vsize.h;
    camera.updateProjectionMatrix();
    renderer.setSize(vsize.w, vsize.h);
    blobEffect.resize();
}

function getMouseCoords(ex, ey) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var mouse = new THREE.Vector3(((ex) / w) * 2 - 1, -(ey / h) * 2 + 1, 0.5);
    mouse.unproject(camera);
    var dir = mouse.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    var p = new b2Vec2(pos.x, pos.y);
    return p;
}


var mouseX = window.innerWidth / 2;;
var mouseY = window.innerHeight / 2;
var mouseState = 0;

function MouseClick() {
    var s;
    var elements = document.elementsFromPoint(crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2, crosshairs.offsetTop + (crosshairs.offsetHeight) / 2);
    try {
        if (elements[1].id == "canvas") {
            if (mouseState == 1) {
                mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
                mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
                var p = getMouseCoords(mouseX, mouseY);
                doMouse(p);
            }
        } else {

            // e.currentTarget.index = elements[1].index;
            if (elements[1].nodeName == "HOME") {
                var e1 = {
                    currentTarget: elements[1]
                }
                home.onmousedown(e1);
            } else if (elements[1].nodeName == "BTN") {
                var e = {
                    currentTarget: elements[1]
                }
                elements[1].onmousedown(e);
            } else {
                var temp = parseInt(elements[1].value);
                //                temp++;//                if (temp > 5)
                //                    temp = 1;
                //                elements[1].value = temp;

                mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
                mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
                var x = elements[1].offsetLeft + panel.offsetLeft;
                var w = elements[1].offsetWidth;
                if (mouseX < x + w / 2) {
                    if (temp > 1)
                        elements[1].value = temp - 1;
                } else
                    elements[1].value = temp + 1;
                //                sldwidth.value = 1;
                //                var evt = new MouseEvent("click", {
                //                    bubbles: false,
                //                    cancelable: false,
                //                    isTrusted: true,
                //                    clientX: mouseX,
                //                    clientY: mouseY,
                //                    screenX: mouseX,
                //                    screenY: mouseY
                //                    /* whatever properties you want to give it */
                //                });
                //                elements[1].dispatchEvent(evt);
                //                var q = {
                //                    isTrusted: true,
                //                    screenX: mouseX,
                //                    screenY: mouseY,
                //                    clientX: mouseX,
                //                    clientY: mouseY
                //                }
                //                elements[1].click(q);
            }
            mouseState = 0;
        }
    } catch (e) {}
}

function MoveMouse(xm, ym) {
    crosshairs.hidden = false;
    try {
        mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
        mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
        mouseX += xm;
        mouseY += ym;
        if (mouseX < 10)
            mouseX = 10;
        if (mouseY < 10)
            mouseY = 10;
        if (mouseX >= window.innerWidth - 10)
            mouseX = window.innerWidth - 10;
        if (mouseY >= window.innerHeight - 10)
            mouseY = window.innerHeight - 10;
        console.log('MoveTo: ', mouseX, mouseY);
        crosshairs.style.left = mouseX - crosshairs.offsetWidth / 2 + "px";
        crosshairs.style.top = mouseY - crosshairs.offsetHeight / 2 + "px";
        var p = getMouseCoords(mouseX, mouseY);
        msMove(p);
    } catch (e) {}
}

function JoystickMoveTo(jy, jx) {
    if (!inMenu) {
        crosshairs.hidden = false;
        if (Math.abs(jx) < .2 && Math.abs(jy) < .2) {
            try {
                if (gpad.getButton(14).value > 0) // dpad left
                    MoveMouse(-7, 0);
                if (gpad.getButton(12).value > 0) // dup
                    MoveMouse(0, -5);
                if (gpad.getButton(13).value > 0) // ddown
                    MoveMouse(0, 5);
                if (gpad.getButton(15).value > 0) // dright
                    MoveMouse(7, 0);
            } catch (e) {}
            return;
        }
        if (Math.abs(jx) < .1)
            jx = 0;
        if (Math.abs(jy) < .1)
            jy = 0;
        if (jx == 0 && jy == 0)
            return;
        MoveMouse(jx * 20, jy * 20);
    }
}

function getAxes() {
    //       console.log('Axis', gpad.getAxis(0), gpad.getAxis(1), gpad.getButton(14).value);

    if (!inMenu) {
        JoystickMoveTo(gpad.getAxis(1), gpad.getAxis(0));
        JoystickMoveTo(gpad.getAxis(3), gpad.getAxis(2));
    }
    setTimeout(function () {
        getAxes();
    }, 50);
}

gamepads.addEventListener('connect', e => {
    //        crosshairs.hidden = false;
    console.log('Gamepad connected:');
    console.log(e.gamepad);
    Highlight()
    gpad = e.gamepad;
    e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
    e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
    //       e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
    //            StandardMapping.Axis.JOYSTICK_LEFT);
    //        e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
    //            StandardMapping.Axis.JOYSTICK_RIGHT);
    setTimeout(function () {
        getAxes();
    }, 50);
});

gamepads.addEventListener('disconnect', e => {
    console.log('Gamepad disconnected:');
    console.log(e.gamepad);
});

var menuItem = 0;
gamepads.start();

function Highlight() {
    button.style.opacity = .7;
    button1.style.opacity = .7;
    button2.style.opacity = .7;
    button3.style.opacity = .7;
    button4.style.opacity = .7;
    button5.style.opacity = .7;
    button6.style.opacity = .7;
    button7.style.opacity = .7;
    switch (menuItem) {
        case 0:
            button.style.opacity = 1.;
            break;
        case 1:
            button1.style.opacity = 1.;
            break;
        case 2:
            button2.style.opacity = 1.;
            break;
        case 3:
            button3.style.opacity = 1.;
            break;
        case 4:
            button4.style.opacity = 1.;
            break;
        case 5:
            button5.style.opacity = 1.;
            break;
        case 6:
            button6.style.opacity = 1.;
            break;
        case 7:
            button7.style.opacity = 1.;
            break;
    }
}

function showPressedButton(index) {
    console.log("Press: ", index);
    if (inMenu) {
        switch (index) {
            case 0: // A
            case 1: // B
            case 2: // X
            case 3: // Y
                start(menuItem + 1);
                break;
            case 12: // dup
                if (menuItem > 3)
                    menuItem -= 4;
                Highlight();
                break;
            case 13: // ddown
                if (menuItem < 4)
                    menuItem += 4;
                Highlight();
                break;
            case 14: // dleft
                if (menuItem > 0)
                    menuItem--;
                Highlight();
                break;
            case 15: // dright
                if (menuItem < 7)
                    menuItem++;
                Highlight();
                break;
        }
        console.log("Menu: ", menuItem);
    } else switch (index) {
        case 0: // A
        case 2: // X mouse down
            mouseState = 1;
            MouseClick();
            break;
        case 1: // B
        case 3: // Y mouse toggle
            mouseState = 1 - mouseState;
            if (mouseState == 1)
                MouseClick();
            else {
                var p = getMouseCoords(mouseX, mouseY);
                msUp(p);
            }
            break;
        case 10: // XBox
            showMenu();
            break;
        default:
    }
}

function removePressedButton(index) {
    console.log("Releasd: ", index);
    switch (index) {
        case 0: // A
        case 2: // X mouse up
            mouseState = 0;
            var p = getMouseCoords(mouseX, mouseY);
            msUp(p);
            break;
        default:
    }
}

function moveJoystick(values, isLeft) {
    console.log("Joystick: ", values[0], values[1]);
    if (values[1] >= 0 || values[1] >= 0) {
        XBoxVolume = Math.max(values[1], values[0]);
    }

}
