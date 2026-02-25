// app/api/products/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    console.log('API Route: Fetching products from external API...');
    
    const externalUrl = 'https://assetsvilva.blr1.cdn.digitaloceanspaces.com/digital_cart/divine-thaithingal/data.json';
    console.log('API Route: External URL:', externalUrl);
    
    const response = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS/1.0)'
      },
      cache: 'no-store',
    });

    console.log('API Route: External API response status:', response.status);
    
    if (!response.ok) {
      console.error('API Route: External API failed with status:', response.status);
      throw new Error(`External API error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Route: Raw data received:', data);

    // The JSON structure is { products: [...], payment_gateways: [...], updated_at: "..." }
    // So we need to access data.products
    const productsArray = data.products;

    // Check if products is an array
    if (!Array.isArray(productsArray)) {
      throw new Error('API did not return products array');
    }

    // Format the data - no is_active filter needed since all products in JSON are active
    const formattedProducts = productsArray
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)) // Sort by sort_order
      .map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        price: `₹${parseFloat(item.price).toFixed(0)}`,
        mrp: item.mrp ? `₹${parseFloat(item.mrp).toFixed(0)}` : undefined,
        description: item.description || item.name,
        image: item.image ? item.image.replace(/\\\//g, '/') : '', // Fix escaped slashes
        sku: item.sku || '',
        quantity: item.quantity || 0,
        weight_kg: item.weight_kg || '',
        sort_order: item.sort_order || 0,
      }));

    console.log('API Route: Formatted products:', formattedProducts.length);

    return NextResponse.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length,
      payment_gateways: data.payment_gateways || [],
      updated_at: data.updated_at || null,
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      }
    });
  } catch (error: any) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        message: error.message || 'Internal server error',
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}