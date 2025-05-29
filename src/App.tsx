import React, { useState } from 'react';
import { Container, Box, Typography, Button, Card, CardMedia, CardContent, Dialog, DialogContent, DialogTitle, IconButton, Link, Avatar, Rating, AppBar, Toolbar, useScrollTrigger, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

// Define types for menu items
type MenuItem = {
  name: string;
  price: string;
  description: string;
};

type MenuCategory = {
  [key: string]: MenuItem[];
};

type MenuCategoryKey = 'starters' | 'mainCourse' | 'sweets';

const heroImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80';
const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', // Restaurant Interior
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', // Fine Dining
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', // Chef Cooking
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80', // Food Presentation
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80', // Bar Area
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', // Outdoor Seating
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80', // Wine Selection
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', // Special Events
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80', // Private Dining Room
];

// Menu Categories with proper typing
const menuCategories: MenuCategory = {
  starters: [
    { name: 'Paneer Tikka', price: '₹280', description: 'Cottage cheese marinated in spices and grilled to perfection' },
    { name: 'Veg Spring Roll', price: '₹220', description: 'Crispy rolls filled with mixed vegetables and Chinese spices' },
    { name: 'Hara Bhara Kebab', price: '₹260', description: 'Spinach and green pea patties with Indian spices' },
    { name: 'Veg Manchurian', price: '₹240', description: 'Vegetable dumplings in spicy Chinese sauce' },
    { name: 'Aloo Tikki', price: '₹180', description: 'Spiced potato patties served with mint chutney' },
  ],
  mainCourse: [
    { name: 'Paneer Butter Masala', price: '₹320', description: 'Cottage cheese in rich tomato and butter gravy' },
    { name: 'Veg Biryani', price: '₹280', description: 'Fragrant basmati rice cooked with mixed vegetables and spices' },
    { name: 'Veg Noodles', price: '₹240', description: 'Stir-fried noodles with fresh vegetables' },
    { name: 'Malai Kofta', price: '₹300', description: 'Vegetable dumplings in creamy tomato gravy' },
    { name: 'Veg Fried Rice', price: '₹220', description: 'Chinese-style fried rice with mixed vegetables' },
  ],
  sweets: [
    { name: 'Gulab Jamun', price: '₹180', description: 'Sweet milk dumplings soaked in sugar syrup' },
    { name: 'Rasmalai', price: '₹220', description: 'Cottage cheese dumplings in sweetened milk' },
    { name: 'Ice Cream', price: '₹150', description: 'Vanilla, chocolate, or strawberry ice cream' },
    { name: 'Kheer', price: '₹160', description: 'Traditional rice pudding with nuts and cardamom' },
    { name: 'Jalebi', price: '₹140', description: 'Crispy sweet pretzels soaked in sugar syrup' },
  ],
};

// Create a styled Grid component
const StyledGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: theme.spacing(2),
  '& > *': {
    gridColumn: 'span 12',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 'span 6',
    },
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 4',
    },
  },
}));

const MenuCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
}));

// Hide AppBar on scroll down
function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

// Navigation menu items
const menuItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Menu', id: 'menu' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

function App() {
  const [selectedMenu, setSelectedMenu] = useState<MenuCategoryKey | null>(null);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {/* Navigation Bar */}
      <HideOnScroll>
        <AppBar position="fixed" sx={{ bgcolor: 'rgba(0, 0, 0, 0.8)' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Anurag's Restaurant
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                color="inherit"
                onClick={() => setPrivacyDialogOpen(true)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Privacy Policy
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer for fixed AppBar */}

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          backgroundImage: `url(${galleryImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <Box textAlign="center" position="relative" zIndex={1}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Anurag's Restaurant
          </Typography>
          <Typography variant="h5" gutterBottom>
            Experience the Taste of Excellence
          </Typography>
          <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
            Reserve a Table
          </Button>
        </Box>
      </Box>

      {/* About Section */}
      <Container id="about" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          About Us
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="text.secondary" paragraph>
              Welcome to Anurag Restaurant, where culinary artistry meets a cozy ambiance. Our journey began with a simple passion for creating memorable dining experiences through exceptional food and service.
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              Whether you're celebrating a special occasion or enjoying a casual dinner, our warm and inviting atmosphere, combined with our attentive service, ensures an unforgettable dining experience.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Our commitment to excellence extends beyond the kitchen. We take pride in our carefully curated wine selection, featuring both local and international labels that perfectly complement our menu.
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              We also take pride in our commitment to sustainability. Our restaurant implements eco-friendly practices, from sourcing ingredients locally to reducing waste and using energy-efficient equipment. This dedication to environmental responsibility is just one more way we strive to make a positive impact in our community while serving you the finest dining experience.
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Restaurant Interior"
              />
            </Card>
          </Box>
        </Box>
      </Container>

      {/* Menu Section */}
      <Box id="menu" sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography variant="h4" fontWeight={600} gutterBottom textAlign="center">
            Our Menu
          </Typography>
          <StyledGrid>
            {Object.entries(menuCategories).map(([category, items]) => (
              <MenuCard 
                key={category} 
                onClick={() => setSelectedMenu(category as MenuCategoryKey)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://images.unsplash.com/photo-${
                    category === 'starters' ? '1601050690597-df0568f70950' : // Indian starters image
                    category === 'mainCourse' ? '1512058564366-18510be2db19' : // Indian main course image - new image
                    '1551024506-0bccd828d307' // sweets image
                  }?auto=format&fit=crop&w=800&q=80`}
                  alt={category}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category === 'starters' ? 'Starters' : 
                     category === 'mainCourse' ? 'Main Course' : 
                     'Sweets'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click to view our {category === 'starters' ? 'starters' : 
                                    category === 'mainCourse' ? 'main course' : 
                                    'sweets'}
                  </Typography>
                </CardContent>
              </MenuCard>
            ))}
          </StyledGrid>
        </Container>
      </Box>

      {/* Menu Dialog */}
      <Dialog 
        open={Boolean(selectedMenu)} 
        onClose={() => setSelectedMenu(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedMenu && selectedMenu.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
          <IconButton
            onClick={() => setSelectedMenu(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedMenu && menuCategories[selectedMenu].map((item: MenuItem, index: number) => (
            <Box key={index} sx={{ mb: 2, p: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.description}</Typography>
              <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>{item.price}</Typography>
            </Box>
          ))}
        </DialogContent>
      </Dialog>

      {/* Gallery Section */}
      <Container id="gallery" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom textAlign="center">
          Gallery
        </Typography>
        <StyledGrid>
          {galleryImages.map((img, idx) => (
            <Card key={idx} sx={{ height: '100%' }}>
              <CardMedia 
                component="img" 
                height="250" 
                image={img} 
                alt={`Gallery ${idx + 1}`}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          ))}
        </StyledGrid>
      </Container>

      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography variant="h4" fontWeight={600} gutterBottom textAlign="center">
            What Our Customers Say
          </Typography>
          <StyledGrid>
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Priya Sharma</Typography>
                  <Rating value={5} readOnly />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "The vegetarian menu at Anurag Restaurant is exceptional! The Paneer Butter Masala is the best I've ever had. The ambiance is perfect for family dinners, and the service is impeccable."
              </Typography>
            </Card>

            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Rahul Patel</Typography>
                  <Rating value={5} readOnly />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "I love the variety of dishes here! The Veg Biryani is aromatic and perfectly spiced. The staff is very attentive, and the restaurant maintains excellent hygiene standards."
              </Typography>
            </Card>

            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Ananya Gupta</Typography>
                  <Rating value={5} readOnly />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "The desserts are heavenly! The Gulab Jamun is melt-in-your-mouth delicious. I appreciate how they maintain authentic flavors while keeping everything vegetarian."
              </Typography>
            </Card>

            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Vikram Singh</Typography>
                  <Rating value={5} readOnly />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "Great place for business lunches! The Veg Manchurian and Noodles are my go-to dishes. The restaurant has a professional atmosphere and excellent service."
              </Typography>
            </Card>

            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Meera Kapoor</Typography>
                  <Rating value={5} readOnly />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "The Hara Bhara Kebab is a must-try! The restaurant's commitment to quality ingredients is evident in every dish. Perfect for both casual and special occasions."
              </Typography>
            </Card>

            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Arjun Mehta</Typography>
                  <Rating value={5} readOnly />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                "The Malai Kofta is absolutely divine! The restaurant's attention to detail in both food and service makes it one of my favorite dining spots in the city."
              </Typography>
            </Card>
          </StyledGrid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ bgcolor: '#222', color: '#fff', py: 6 }}>
        <Container>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Contact Us
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" paragraph>
                Gomti Nagar, Lucknow
              </Typography>
              <Typography variant="body1" paragraph>
                Phone: +91 6394524348
              </Typography>
              <Typography variant="body1" paragraph>
                Email: anurag@gmail.com
              </Typography>
              <Typography variant="body1" paragraph>
                Hours: Monday - Sunday: 11:00 AM - 11:00 PM
              </Typography>
              <Link
                component="button"
                variant="body1"
                onClick={() => setPrivacyDialogOpen(true)}
                sx={{ color: 'primary.light', textDecoration: 'underline', p: 0, border: 'none', background: 'none' }}
              >
                Privacy Policy
              </Link>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body1" paragraph>
                Instagram: @anuragrestaurant
              </Typography>
              <Typography variant="body1" paragraph>
                Facebook: Anurag Restaurant
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Privacy Policy Dialog */}
      <Dialog 
        open={privacyDialogOpen} 
        onClose={() => setPrivacyDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Privacy Policy
          <IconButton
            onClick={() => setPrivacyDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            At Anurag Restaurant, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            • Contact information (name, email, phone number) for reservations and communications<br />
            • Dietary preferences and special requests<br />
            • Feedback and reviews<br />
            • Website usage data
          </Typography>
          <Typography variant="h6" gutterBottom>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            • To process and manage your reservations<br />
            • To provide personalized dining experiences<br />
            • To improve our services and menu offerings<br />
            • To communicate with you about special events and promotions
          </Typography>
          <Typography variant="h6" gutterBottom>
            Data Protection
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate security measures to protect your personal information. Your data is never shared with third parties without your consent, except as required by law.
          </Typography>
          <Typography variant="body1" paragraph>
            For any privacy-related concerns, please contact us at privacy@anuragrestaurant.com
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
