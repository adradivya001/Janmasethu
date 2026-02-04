
export interface PregnancyWeek {
    week: number;
    fruit: string;
    size: string;
    weight: string;
    description: string;
    image: string; // Placeholder for now, can be replaced by real assets
}

export const pregnancyWeeks: PregnancyWeek[] = [
    { week: 4, fruit: "Poppy Seed", size: "1-2 mm", weight: "< 1g", description: "Your baby is the size of a poppy seed. The blastocyst is implanting in your uterus.", image: "/assets/fruits/poppyseed.png" },
    { week: 5, fruit: "Sesame Seed", size: "3-5 mm", weight: "< 1g", description: "Your baby is the size of a sesame seed. The neural tube is forming.", image: "/assets/fruits/sesameseed.png" },
    { week: 6, fruit: "Lentil", size: "5-7 mm", weight: "< 1g", description: "Your baby is the size of a sweet pea or lentil. The heart starts beating.", image: "/assets/fruits/lentil.png" },
    { week: 7, fruit: "Blueberry", size: "10-13 mm", weight: "< 1g", description: "Your baby is doubling in size and is now the size of a blueberry.", image: "/assets/fruits/blueberry.png" },
    { week: 8, fruit: "Raspberry", size: "1.6 cm", weight: "1g", description: "Your baby is the size of a raspberry. Fingers and toes are forming.", image: "/assets/fruits/raspberry.png" },
    { week: 9, fruit: "Grape", size: "2.3 cm", weight: "2g", description: "Your baby is the size of a grape. Eyes are fully formed but eyelids are fused shut.", image: "/assets/fruits/grape.png" },
    { week: 10, fruit: "Kumquat", size: "3.1 cm", weight: "4g", description: "Your baby is the size of a kumquat. Vital organs are starting to function.", image: "/assets/fruits/kumquat.png" },
    { week: 11, fruit: "Fig", size: "4.1 cm", weight: "7g", description: "Your baby is the size of a fig. Usually, the head makes up half the body length.", image: "/assets/fruits/fig.png" },
    { week: 12, fruit: "Lime", size: "5.4 cm", weight: "14g", description: "Your baby is the size of a lime. You're nearing the end of the first trimester!", image: "/assets/fruits/lime.png" },
    { week: 13, fruit: "Lemon", size: "7.4 cm", weight: "23g", description: "Your baby is the size of a lemon. Vocal cords are developing.", image: "/assets/fruits/lemon.png" },
    { week: 14, fruit: "Nectarine", size: "8.7 cm", weight: "43g", description: "Your baby is the size of a nectarine. Welcome to the second trimester!", image: "/assets/fruits/nectarine.png" },
    { week: 15, fruit: "Apple", size: "10.1 cm", weight: "70g", description: "Your baby is the size of an apple. They can sense light now.", image: "/assets/fruits/apple.png" },
    { week: 16, fruit: "Avocado", size: "11.6 cm", weight: "100g", description: "Your baby is the size of an avocado. You might start feeling movement soon.", image: "/assets/fruits/avocado.png" },
    { week: 17, fruit: "Pear", size: "13 cm", weight: "140g", description: "Your baby is the size of a pear. Skeleton is hardening.", image: "/assets/fruits/pear.png" },
    { week: 18, fruit: "Bell Pepper", size: "14.2 cm", weight: "190g", description: "Your baby is the size of a bell pepper. Nerves are developing myelin.", image: "/assets/fruits/pepper.png" },
    { week: 19, fruit: "Heirloom Tomato", size: "15.3 cm", weight: "240g", description: "Your baby is the size of a tomato. Senses (smell, taste, canvas) are developing.", image: "/assets/fruits/tomato.png" },
    { week: 20, fruit: "Banana", size: "16.4 cm", weight: "300g", description: "Your baby is the size of a banana. You're halfway there!", image: "/assets/fruits/banana.png" },
    { week: 21, fruit: "Carrot", size: "26.7 cm", weight: "360g", description: "Your baby is the size of a large carrot. Eyebrows and eyelids are present.", image: "/assets/fruits/carrot.png" },
    { week: 22, fruit: "Spaghetti Squash", size: "27.8 cm", weight: "430g", description: "Your baby is the size of a squash. Taste buds are active.", image: "/assets/fruits/squash.png" },
    { week: 23, fruit: "Large Mango", size: "28.9 cm", weight: "500g", description: "Your baby is the size of a mango. Hearing is well established.", image: "/assets/fruits/mango.png" },
    { week: 24, fruit: "Ear of Corn", size: "30 cm", weight: "600g", description: "Your baby is the size of corn. Lungs are developing branches.", image: "/assets/fruits/corn.png" },
    { week: 25, fruit: "Rutabaga", size: "34.6 cm", weight: "660g", description: "Your baby is the size of a rutabaga. Hair is growing.", image: "/assets/fruits/rutabaga.png" },
    { week: 26, fruit: "Scallion", size: "35.6 cm", weight: "760g", description: "Your baby is the size of a scallion. Eyelids can open now.", image: "/assets/fruits/scallion.png" },
    { week: 27, fruit: "Cauliflower", size: "36.6 cm", weight: "875g", description: "Your baby is the size of cauliflower. Welcome to the third trimester!", image: "/assets/fruits/cauliflower.png" },
    { week: 28, fruit: "Eggplant", size: "37.6 cm", weight: "1 kg", description: "Your baby is the size of an eggplant. Can dream while sleeping.", image: "/assets/fruits/eggplant.png" },
    { week: 29, fruit: "Butternut Squash", size: "38.6 cm", weight: "1.15 kg", description: "Your baby is the size of a butternut squash. Bones are fully developed.", image: "/assets/fruits/butternut.png" },
    { week: 30, fruit: "Cabbage", size: "39.9 cm", weight: "1.3 kg", description: "Your baby is the size of a cabbage. Memory is starting to work.", image: "/assets/fruits/cabbage.png" },
    { week: 31, fruit: "Coconut", size: "41.1 cm", weight: "1.5 kg", description: "Your baby is the size of a coconut. Reproductive organs are fully formed.", image: "/assets/fruits/coconut.png" },
    { week: 32, fruit: "Jicama", size: "42.4 cm", weight: "1.7 kg", description: "Your baby is the size of a jicama. Practicing breathing motions.", image: "/assets/fruits/jicama.png" },
    { week: 33, fruit: "Pineapple", size: "43.7 cm", weight: "1.9 kg", description: "Your baby is the size of a pineapple. Immune system is developing.", image: "/assets/fruits/pineapple.png" },
    { week: 34, fruit: "Cantaloupe", size: "45 cm", weight: "2.1 kg", description: "Your baby is the size of a cantaloupe. Vernix is getting thicker.", image: "/assets/fruits/cantaloupe.png" },
    { week: 35, fruit: "Honeydew Melon", size: "46.2 cm", weight: "2.4 kg", description: "Your baby is the size of a honeydew. Kidneys are fully developed.", image: "/assets/fruits/honeydew.png" },
    { week: 36, fruit: "Romaine Lettuce", size: "47.4 cm", weight: "2.6 kg", description: "Your baby is the size of a head of lettuce. Shedding lanugo.", image: "/assets/fruits/lettuce.png" },
    { week: 37, fruit: "Swiss Chard", size: "48.6 cm", weight: "2.9 kg", description: "Your baby is the size of chard. Considered early term.", image: "/assets/fruits/chard.png" },
    { week: 38, fruit: "Leek", size: "49.8 cm", weight: "3.1 kg", description: "Your baby is the size of a leek. Systems are ready for the world.", image: "/assets/fruits/leek.png" },
    { week: 39, fruit: "Watermelon", size: "50.7 cm", weight: "3.3 kg", description: "Your baby is the size of a small watermelon. Waiting for hello day!", image: "/assets/fruits/watermelon.png" },
    { week: 40, fruit: "Pumpkin", size: "51.2 cm", weight: "3.5 kg", description: "Your baby is the size of a pumpkin. Happy Due Date!", image: "/assets/fruits/pumpkin.png" }
];
