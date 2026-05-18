import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VideoGridComponent } from './video-grid.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('VideoGridComponent', () => {
  let component: VideoGridComponent;
  let fixture: ComponentFixture<VideoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoGridComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize videos on ngOnInit', () => {
    const sanitizer = TestBed.inject(DomSanitizer);

    component.ngOnInit();

    expect(component.allVideos.length).toBe(50);
    expect(component.allVideos[0].url).toBeTruthy();
    expect(component.filteredVideos.length).toBeGreaterThan(0);
  });

  it('should load more videos correctly', () => {
    component.ngOnInit();

    const initialLength = component.filteredVideos.length;

    component.loadMore();

    expect(component.filteredVideos.length).toBeGreaterThanOrEqual(initialLength);
  });

  it('should filter videos by type', () => {
    component.ngOnInit();

    component.filterVideos('cars');

    expect(component.selectedType).toBe('cars');

    const allCars = component.filteredVideos.every(v => v.type === 'cars');
    expect(allCars).toBeTrue();
  });

  it('should return all videos when type is all', () => {
    component.ngOnInit();

    component.selectedType = 'all';

    const result = component.getFilteredSource();

    expect(result.length).toBe(50);
  });

  it('should return filtered videos for non-all type', () => {
    component.ngOnInit();

    component.selectedType = 'tech';

    const result = component.getFilteredSource();

    expect(result.every(v => v.type === 'tech')).toBeTrue();
  });

  it('should toggle menu and close others', () => {
    component.ngOnInit();

    const v1 = component.filteredVideos[0];
    const v2 = component.filteredVideos[1];

    v1.menuOpen = false;
    v2.menuOpen = true;

    const event = new Event('click');

    component.toggleMenu(v1, event);

    expect(v1.menuOpen).toBeTrue();
    expect(v2.menuOpen).toBeFalse();
  });

  it('should stop event propagation in toggleMenu', () => {
    component.ngOnInit();

    const video = component.filteredVideos[0];

    const event = new Event('click');
    spyOn(event, 'stopPropagation');

    component.toggleMenu(video, event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });
});