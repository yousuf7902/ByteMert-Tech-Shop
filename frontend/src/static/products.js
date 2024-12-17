const products = [
    {
        name: "Airpods Wireless Bluetooth Headphones",
        image: "/images/airpods.jpg",
        description:
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        brand: "Apple",
        category: "Gadgets",
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        date: "2023-06-15",
        totalSell: 150,
    },
    {
        name: "iPhone 11 Pro 256GB Memory",
        image: "/images/phone.jpg",
        description:
            "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
        brand: "Apple",
        category: "Smartphones",
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
        date: "2024-07-01",
        totalSell: 200,
    },
    {
        name: "Cannon EOS 80D DSLR Camera",
        image: "/images/camera.jpg",
        description:
            "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        brand: "Cannon",
        category: "Cameras",
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
        date: "2023-05-20",
        totalSell: 75,
    },
    {
        name: "Sony Playstation 4 Pro White Version",
        image: "/images/playstation.jpg",
        description:
            "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, musicThe ultimate home entertainment center starts with PlayStation.",
        brand: "Sony",
        category: "Gadgets",
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
        date: "2023-08-10",
        totalSell: 300,
    },
    {
        name: "Logitech GSeries Gaming Mouse",
        image: "/images/mouse.jpg",
        description:
            "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
        brand: "Logitech",
        category: "Accessories",
        price: 49.99,
        countInStock: 7,
        rating: 4.5,
        numReviews: 10,
        date: "2023-09-25",
        totalSell: 180,
    },
    {
        name: "Amazon Echo Dot 3rd Generation",
        image: "/images/alexa.jpg",
        description:
            "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
        brand: "Amazon",
        category: "Gadgets",
        price: 29.99,
        countInStock: 0,
        rating: 3.5,
        numReviews: 12,
        date: "2023-08-10",
        totalSell: 120,
    },
    {
        name: "Amazon Echo Dot 3rd Generation",
        image: "/images/alexa.jpg",
        description:
            "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
        brand: "Amazon",
        category: "TV",
        price: 29.99,
        countInStock: 0,
        rating: 1,
        numReviews: 9,
        date: "2023-05-20",
        totalSell: 90,
    },
    {
        name: "Amazon Echo Dot 3rd Generation",
        image: "/images/alexa.jpg",
        description:
            "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
        brand: "Amazon",
        category: "Smart Watch",
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 5,
        date: "2023-09-01",
        totalSell: 110,
    },
    {
        name: "iPhone 11 Pro 256GB Memory",
        image: "/images/phone.jpg",
        description:
            "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
        brand: "Apple",
        category: "Smartphones",
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
        date: "2024-07-01",
        totalSell: 200,
    },
    {
        name: "Cannon EOS 80D DSLR Camera",
        image: "/images/camera.jpg",
        description:
            "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        brand: "Cannon",
        category: "Cameras",
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
        date: "2023-05-20",
        totalSell: 75,
    },
    { 
        name: "Sony Playstation 4 Pro White Version",
        image: "/images/playstation.jpg",
        description:
            "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, musicThe ultimate home entertainment center starts with PlayStation.",
        brand: "Sony",
        category: "Gadgets",
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
        date: "2023-08-10",
        totalSell: 300,
    },
];

// branding data
export const brandingData = [
    {
        id: 1,
        title: "Free Shipping",
        Description: "From all orders over 100$",
        icon: (
            <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 1H5.63636V24.1818H35"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M34.9982 1H11.8164V18H34.9982V1Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M11.8164 7.18164H34.9982"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
            </svg>
        ),
    },
    {
        id: 2,
        title: "Daily Surprise Offers",
        Description: "Save up to 25% off",
        icon: (
            <svg
                width="32"
                height="34"
                viewBox="0 0 32 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                ></path>
                <path
                    d="M30.7 2L29.5 10.85L20.5 9.65"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
            </svg>
        ),
    },
    {
        id: 4,
        title: "Affortable Prices",
        Description: "Get Factory direct price",
        icon: (
            <svg
                width="32"
                height="35"
                viewBox="0 0 32 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                ></path>
                <path
                    d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                ></path>
                <path d="M16 28V22" stroke="#1E3A8A" stroke-width="2" stroke-miterlimit="10"></path>
                <path
                    d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
            </svg>
        ),
    },
    {
        id: 5,
        title: "Secure Payments",
        Description: "100% protected payments",
        icon: (
            <svg
                width="32"
                height="38"
                viewBox="0 0 32 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
                <path
                    d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                    stroke="#1E3A8A"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                ></path>
            </svg>
        ),
    },
];

export default products;
