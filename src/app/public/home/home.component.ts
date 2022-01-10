import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxMasonryOptions } from 'ngx-masonry';

interface Action{
  label?: string,
  icon?: string,
  callback?: (event: any) => any;
  style?: "raised" | "flat" | "stroked" | "icon" | "fab" | "minifab" | "basic";
  color?: "primary" | "accent" | "warn";
}

interface CardItem{
  title?: string;
  text: string;
  image_src?: string;
  actions?: Action[];
}

const card_trigger = trigger("card-trigger", [
  state('*', style({
    visibility: "hidden",
    opacity: 0, 
    transform: "translateY(-100px)",
  })),
  state('hidden', style({
    visibility: "hidden",
    opacity: 0, 
    transform: "translateY(-100px)",
  })),
  state('shown', style({
    visibility: "visible",
    opacity: 1,
    transform: "none",
  })),
  transition('hidden <=> shown', [
    animate('.5s ease-out'),
  ]),
  transition('* <=> shown', [
    animate('.5s ease-out', style(
      {
        visibility: "visible",
        opacity: 1,
        transform: "none",
      }
    )),
  ])
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    card_trigger,
  ]
})
export class HomeComponent implements OnInit {

  show_cards: boolean = false;

  items: CardItem[] = [
    {
      title: "Pride",
      text: `Being prideful of the work being done is more important than you may think. A sense of pride in one's work will inherently cause motivation. A lack of pride can cause a fallout in percieved purpose or motivation. 
      
      Additionally, the work being done should be well enough that one can be prideful of it. Too many times I've seen projects that people do not have a strong will or desire to work on. They have a lack of pride. The project is failing, solutions are overlooked, and insensible actions are taken for various problems.`
    },
    {
      title: "Efficiency",
      text: `Efficiency of the working solution is important. If there is a more elegant, more meaningful way to execute a solution, it should be done.`
    },
    {
      title: "Integrity",
      text: `Integrity is important. Holding true to a certain requirement or goal is important. This goes both ways between a designer, engineer, or programmer, and the manager. I strive to keep integrity high for projects, whatever the scope. A lack in integrity will certainly be appearant in the end-product, and ultimately hurt both the user and the maker of the product. I strive to keep my projects reliable, honest, and to the point. No web-app or back-end solution should be rushed to work, cut corners, or fake in functionality. This requires understanding from both parties.`,
      //image_src: "https://www.rootsofaction.com/wp-content/uploads/2017/02/Integrity-borders.jpg",
    },
    {
      title: "Creativeness",
      text: "Creativeness leads us to unexpected solutions. Creativeness can solve issues we believe are unsolvable. Thinking outside the box isn't something that can be taught, it must be understood inherently. "
    },
    {
      title: "Polish",
      text: `Designs need refined again and again, until you see little improvement from one iteration to the next. Polish is important for both internal products, and products going out into the hands of people. 
      
      A design without polish can leave users in a jarring experience, which will break flow. When things are polished and work well together, the flow is almost euphoric. Things feel like the future when they are polished, and thats the feeling I want people to have when they use my projects, designs, or products.`
    },
    {
      title: "Get to know me",
      text: `Why don't you get to know me a little better? Lets go to the 'About' page.`,
      actions: [
        {
          callback: () => {
            this.router.navigate(['about']);
          },
          color: "accent",
          label: "Let's go",
          style: "stroked",
        }
      ]
    }
  ];

  masonry_options: NgxMasonryOptions = {
    fitWidth: true,
  }

  constructor(private router: Router, private bpo: BreakpointObserver) {
    
  }

  ngOnInit(): void {
  }

  is_tiny(){
    return this.bpo.isMatched('(max-width: 599px)');
  }

}
