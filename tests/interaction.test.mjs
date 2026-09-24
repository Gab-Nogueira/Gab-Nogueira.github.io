import test from 'node:test';
import assert from 'node:assert/strict';
import { createMenuNavigation } from '../src/lib/menuNavigation.ts';
import { getFloatPath, technologyParallax } from '../src/lib/floating.ts';
import { technologies } from '../src/data/technologies.ts';

function menuHarness() {
  const events = [], frames = new Map();
  let id = 0;
  const menu = createMenuNavigation({
    setOpen: value => events.push(['open',value]),
    lock: value => events.push(['lock',value]),
    navigate: href => events.push(['navigate',href]),
    focusTrigger: () => events.push(['focus']),
    schedule: callback => { frames.set(++id,callback); return id; },
    cancel: frame => frames.delete(frame),
  });
  const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback=>callback()); };
  return { menu, events, flush };
}

test('menu keeps scrolling locked until the actual exit completes and then visits the selected section', () => {
  const {menu,events,flush}=menuHarness();
  menu.changeOpen(true); menu.complete(true); menu.select('#expertise'); flush();
  assert.deepEqual(events,[['lock',true],['open',true],['open',false]]);
  menu.complete(false); flush();
  assert.deepEqual(events.slice(-2),[['lock',false],['navigate','#expertise']]);
});

test('Escape/close restores the trigger, including an immediate reduced-motion close', () => {
  const {menu,events,flush}=menuHarness();
  menu.changeOpen(true); menu.changeOpen(false); menu.complete(false); flush();
  assert.deepEqual(events.slice(-2),[['lock',false],['focus']]);
  assert.equal(events.some(event=>event[0]==='navigate'),false);
});

test('duplicate exit notifications do not cancel the requested navigation', () => {
  const {menu,events,flush}=menuHarness();
  menu.changeOpen(true); menu.select('#about'); menu.complete(false); menu.complete(false); flush();
  assert.deepEqual(events.filter(event=>event[0]==='navigate'),[['navigate','#about']]);
  assert.equal(events.some(event=>event[0]==='focus'),false);
});

test('quick reopening cancels stale navigation instead of moving the page behind the open menu', () => {
  const {menu,events,flush}=menuHarness();
  menu.changeOpen(true); menu.select('#contact'); menu.complete(false); menu.changeOpen(true); flush();
  menu.complete(false); flush();
  assert.equal(events.some(event=>event[0]==='navigate'),false);
  assert.deepEqual(events.at(-1),['open',true]);
});

test('unmounting cancels pending focus/navigation and releases the scroll lock', () => {
  const {menu,events,flush}=menuHarness();
  menu.changeOpen(true); menu.select('#work'); menu.complete(false); menu.dispose(); flush();
  assert.deepEqual(events.at(-1),['lock',false]);
  assert.equal(events.some(event=>['navigate','focus'].includes(event[0])),false);
});

test('floating paths remain within narrow mobile and desktop areas at every waypoint', () => {
  for (const width of [240,276,320,375,430,600,900]) for (const size of [56,68]) {
    const height=width<430?400:450;
    technologies.forEach((technology,index)=>{
      const {base,points}=getFloatPath({width,height,size,x:technology.x,y:technology.y,index});
      for (const point of points) {
        assert.ok(base.x+point.x>=23.99);
        assert.ok(base.x+point.x+size<=width-23.99);
        assert.ok(base.y+point.y>=23.99);
        assert.ok(base.y+point.y+size<=height-23.99);
      }
      assert.ok(Math.abs(points[0].x-points.at(-1).x)<.001);
      assert.ok(Math.abs(points[0].y-points.at(-1).y)<.001);
      assert.ok(technology.area>=0 && technology.area<4);
    });
  }
});

test('technology pointer response stays bounded even at the edges of a narrow field', () => {
  technologies.forEach((technology,index) => {
    const path=getFloatPath({width:240,height:400,size:56,x:technology.x,y:technology.y,index});
    const center=technologyParallax(0,0,index);
    assert.ok(center.x===0 && center.y===0);
    for (const x of [-2,-1,0,1,2]) for (const y of [-2,-1,0,1,2]) {
      const offset=technologyParallax(x,y,index);
      assert.ok(Math.abs(offset.x)<=8 && Math.abs(offset.y)<=5.6);
      for(const point of path.points) {
        assert.ok(path.base.x+point.x+offset.x>=16-1e-8);
        assert.ok(path.base.x+point.x+offset.x+56<=240-16+1e-8);
        assert.ok(path.base.y+point.y+offset.y>=18.4-1e-8);
        assert.ok(path.base.y+point.y+offset.y+56<=400-18.4+1e-8);
      }
    }
  });
});
