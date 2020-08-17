import { Component, OnInit } from '@angular/core';

interface Action{
  label?: string,
  icon?: string,
  callback?: (event: any) => any;
  style?: "raised" | "flat" | "stroked" | "icon" | "fab" | "minifab" | "basic";
  color?: "primary" | "secondary" | "warn";
}

interface CardItem{
  title?: string;
  text: string;
  image_src?: string;
  actions?: Action[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: CardItem[] = [
    {
      title: "The long text",
      text: "This is some test text! Really really long test text so we can see how this stuff will look on the screen, and then make adjustments as we need to perfect the visual look and design of the website.",
      actions: [
        {
          callback: (e) => {
            console.log("They clicked!");
          },
          label: "Sweet!",
          style: "stroked"
        },
        {
          callback: (e) => {
            console.warn("Warning!");
          },
          label: "Warning",
          color: "warn",
          style: "stroked"
        }
      ],
      image_src: "https://cdn.custom-cursor.com/packs/2344/pack2969.png",
    },
    {
      title: "Lorem Ipsum?!",
      text: "Jesus christ! Who the hell even speaks latin anymore? That language is dead! How dare you provoke me and my fellow anti-latin-language friends! You should find your place, which is far from here! Latin will never ever overcome English! Our president may be orange... well, I've got nothing good to say about him either.",
      image_src: "https://external-preview.redd.it/34qKOC48JJMsf92Rs9_cobDnVYz_sl87CElrhVG1Hus.png?auto=webp&s=f3811a4ba5aa7601e7a5a5310737c15556129a26",
    },
    {
      title: "Hey!",
      text: "Hello!",
      image_src: "https://s3.thingpic.com/images/Mt/UX9NhUtAxs9V9CmhtggcMZFB.jpeg",
      actions: [
        {
          color: "primary",
          label: "Contact 'them'",
          style: "raised",
        }
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
