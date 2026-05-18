import { Component, HostListener, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { InputGroupModule } from "primeng/inputgroup";
import { PopoverModule } from "primeng/popover";
import { InputTextModule } from "primeng/inputtext";

type Video = {
  type: string;
  id: string;
  title: string;
  channel: string;
  views: string;
  channelImg: string;
  url?: SafeResourceUrl;
  showMenu?: boolean;
  menuOpen?: boolean;
};

type Category = {
  label: string;
  value: string;
};

@Component({
  selector: "app-video-grid",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./video-grid.component.html",
  styleUrl: "./video-grid.component.scss",
})
export class VideoGridComponent implements OnInit {
  selectedType: string = "all";
  categories: Category[] = [
    { label: "All", value: "all" },
    { label: "Cars", value: "cars" },
    { label: "Tech", value: "tech" },
    { label: "Music", value: "music" },
    { label: "News", value: "news" },
    { label: "Cars", value: "cars" },
    { label: "Tech", value: "tech" },
    { label: "Music", value: "music" },
    { label: "News", value: "news" },
    { label: "Cars", value: "cars" },
    { label: "Tech", value: "tech" },
    { label: "Music", value: "music" },
    { label: "News", value: "news" },
    { label: "Cars", value: "cars" },
    { label: "Tech", value: "tech" },
    { label: "Music", value: "music" },
    { label: "News", value: "news" },
    { label: "Cars", value: "cars" },
    { label: "Tech", value: "tech" },
    { label: "Music", value: "music" },
    { label: "News", value: "news" },
    { label: "Cars", value: "cars" },
    { label: "Tech", value: "tech" },
    { label: "Music", value: "music" },
    { label: "News", value: "news" },
  ];
  filteredVideos: Video[] = [];

  constructor(private sanitizer: DomSanitizer) {}
  allVideos: Video[] = [];
  visibleVideos: Video[] = [];
  batchSize = 6;
  currentIndex = 0;

  ngOnInit(): void {
    const types = ["cars", "tech", "music", "news"];
    this.allVideos = Array.from({ length: 50 })
      .map((_, i) => {
        const type = types[i % types.length];
        return {
          id: i % 2 === 0 ? "jdJoOhqCipA" : "dQw4w9WgXcQ",
          title: `Sample Video ${i + 1}`,
          channel: "Demo Channel",
          views: `${Math.floor(Math.random() * 10)}M views`,
          channelImg: "assets/channels/tv9.jpg",
          type: type,
          showMenu: true,
        };
      })
      .map((v) => ({
        ...v,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${v.id}`,
        ),
      }));

    this.filteredVideos = this.allVideos;
    this.loadMore();
  }

  loadMore() {
    const source = this.getFilteredSource();
    const next = source.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize,
    );
    this.currentIndex += this.batchSize;
    this.filteredVideos = source.slice(0, this.currentIndex);
  }

  @HostListener("window:scroll", [])
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;
    if (scrollPosition >= threshold) {
      this.loadMore();
    }
  }

  filterVideos(type: string) {
    this.selectedType = type;
    this.currentIndex = this.batchSize;
    const source = this.getFilteredSource();
    this.filteredVideos = source.slice(0, this.currentIndex);
  }

  getFilteredSource(): Video[] {
    if (this.selectedType === "all") {
      return this.allVideos;
  }
    return this.allVideos.filter((v) => v.type === this.selectedType);
  }

  toggleMenu(video: Video, event: Event) {
  event.stopPropagation();
    this.filteredVideos.forEach((v) => {
      if (v !== video) {
        v.menuOpen = false;
      }
    });

    video.menuOpen = !video.menuOpen;
  }
}
