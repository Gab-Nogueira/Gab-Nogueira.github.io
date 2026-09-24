import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { textInkRect, titleImpulse, stringControl, dropletPush } from '../src/lib/pointerMotion.ts';
import { prepareHandwriting } from '../src/lib/handwriting.ts';
import { dropletOrbit, workDroplets } from '../src/lib/workDroplets.ts';

test('title ignores line-height whitespace and all pointer positions outside its letters', () => {
  const ink = textInkRect({ left: 200, top: 100, width: 100, height: 306 },
    { size: 100, lineHeight: 153, ascent: .9, descent: .2, inkAscent: .72, inkDescent: 0 });
  assert.equal(ink.top, 179);
  assert.equal(ink.height, 144);
  const previous = { x: 210, y: 220, time: 0 };
  for (const [x, y] of [[250,110],[250,390],[199,220],[301,220],[900,700]]) {
    assert.deepEqual(titleImpulse({ x,y,time:16 }, previous, [ink]), { active:false,x:0,y:0,strength:0 });
  }
  assert.ok(titleImpulse({x:230,y:220,time:16},previous,[ink]).strength > 0);
});

test('title deformation follows both cursor directions and does not pulse while idle', () => {
  const bounds = [{left:0,top:0,width:400,height:200}];
  const at = (x,y,time=16) => ({x,y,time});
  assert.ok(titleImpulse(at(220,100),at(200,100,0),bounds).strength > 0);
  assert.ok(titleImpulse(at(180,100),at(200,100,0),bounds).strength < 0);
  assert.ok(titleImpulse(at(200,80),at(200,100,0),bounds).y < 0);
  assert.equal(titleImpulse(at(200,100),at(200,100,0),bounds).strength,0);
  assert.equal(titleImpulse(at(200,100),null,bounds).strength,0);
  const fast=titleImpulse(at(390,190),at(10,10,0),bounds);
  assert.ok(Math.abs(fast.strength)<=42 && fast.x<=24 && fast.y<=24);
});

test('the elastic line responds to either side and keeps its control point within reach on mobile', () => {
  const rect={left:20,top:100,width:240,height:64};
  assert.deepEqual(stringControl({x:140,y:132},rect),{x:500,y:60});
  assert.ok(stringControl({x:100,y:115},rect).y<60);
  assert.ok(stringControl({x:100,y:150},rect).y>60);
  assert.deepEqual(stringControl({x:-100,y:-100},rect),{x:40,y:-4});
  assert.deepEqual(stringControl({x:1000,y:1000},rect),{x:960,y:124});
});

test('work droplets move separately, return seamlessly and stay finite near the pointer', () => {
  workDroplets.forEach((_,index)=>{
    const orbit=dropletOrbit(index);
    assert.deepEqual(orbit[0],orbit.at(-1));
    assert.notEqual(orbit[0].cy,orbit[1].cy);
    assert.notEqual(orbit[0].cy,orbit[2].cy);
    for(const point of orbit) assert.ok(point.cx>0 && point.cx<1000 && point.cy>0 && point.cy<320 && point.r>0);
  });
  assert.deepEqual(dropletPush({x:0,y:0},{x:800,y:200}),{x:0,y:0});
  assert.ok(dropletPush({x:100,y:100},{x:110,y:100}).x>0);
  assert.ok(dropletPush({x:120,y:100},{x:110,y:100}).x<0);
  assert.deepEqual(dropletPush({x:100,y:100},{x:100,y:100}),{x:0,y:-34});
});

test('handwriting uses measured path units and writes the body before the finishing strokes', () => {
  const path = length => {
    const attributes = new Map([['pathLength','1']]);
    return { attributes, getTotalLength:()=>length,
      setAttribute:(key,value)=>attributes.set(key,value), removeAttribute:key=>attributes.delete(key) };
  };
  const paths=[path(960),path(120)];
  const strokes=prepareHandwriting(paths);
  assert.equal(paths[0].attributes.get('stroke-dasharray'),'960 960');
  assert.equal(paths[0].attributes.get('stroke-dashoffset'),'960');
  assert.equal(paths[0].attributes.has('pathLength'),false);
  assert.equal(strokes[0].start,0);
  assert.equal(strokes[1].start,strokes[0].duration);
  assert.ok(strokes[0].duration>3);
  assert.equal(strokes[1].start+strokes[1].duration,3.6);
});

test('the opening shares the hero palette for explicit themes and the system fallback', async () => {
  const css=await readFile(new URL('../src/styles/preferences.css',import.meta.url),'utf8');
  assert.equal([...css.matchAll(/--intro-surface:\s*var\(--hero-surface\)/g)].length,3);
  assert.equal([...css.matchAll(/--intro-text:\s*var\(--text\)/g)].length,3);
  const loader=await readFile(new URL('../src/components/Loader.tsx',import.meta.url),'utf8');
  assert.doesNotMatch(loader,/pathLength="1"|strokeDashoffset:\s*1\b/);
});
