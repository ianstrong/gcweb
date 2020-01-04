import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    	jQuery(function($){

 			let owl = $('.owl-carousel');

		 	owl.owlCarousel({
		    margin:10,
			touchDrag:false,
			singleItem:true,
			loop: true,
			autoplay: true,
			dots:true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:1
		        },
		        1000:{
		            items:1
		        }
		    }
		});

		$('.customNextBtn').click(function() {
		    owl.trigger('next.owl.carousel');
		});

		$('.customPrevBtn').click(function() {
		    owl.trigger('prev.owl.carousel');
		});

	});
  }

}
