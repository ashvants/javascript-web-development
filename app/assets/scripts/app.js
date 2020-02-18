import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';




var mobileMenu = new MobileMenu();
var stickyHeader = new StickyHeader();
var smodal = new Modal();

new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "70%");
