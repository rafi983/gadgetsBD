import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    // Resolve params explicitly
    const resolvedParams = await params;
    const { rating, title, comment } = await req.json();




    if (!rating || !title || !comment) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const product = await Product.findById(resolvedParams.id);
    if (!product) {

      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Determine initials
    const nameParts = session.user?.name?.split(" ") || ["User"];
    const initials = nameParts.length > 1
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0][0];

    const newReview = {
      reviewerName: session.user?.name || "Customer",
      reviewerInitials: initials.toUpperCase(),
      reviewerEmail: session.user?.email, // Keep track of who reviewed
      rating: Number(rating),
      title,
      comment,
      date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
      location: "Bangladesh"
    };



    // Check if user already reviewed
    const existingReviewIndex = product.reviews?.findIndex((r: any) => r.reviewerEmail === session.user?.email);

    let updatedReviews = [...(product.reviews || [])];

    if (existingReviewIndex !== -1 && existingReviewIndex !== undefined) {

      // Update existing review
      updatedReviews[existingReviewIndex] = newReview;
    } else {

      // Push new review
      updatedReviews.unshift(newReview);
    }

    // Recalculate average rating
    const totalRating = updatedReviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
    const newAverage = updatedReviews.length > 0 ? (totalRating / updatedReviews.length) : 0;



    const updateResult = await Product.findByIdAndUpdate(resolvedParams.id, {
      $set: {
        reviews: updatedReviews,
        rating: newAverage,
        reviewsCount: updatedReviews.length
      }
    }, { new: true });



    return NextResponse.json({ message: "Review saved successfully", review: newReview }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ message: "Error saving review" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const resolvedParams = await params;

    const product = await Product.findById(resolvedParams.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (product.reviews) {
      const filteredReviews = product.reviews.filter((r: any) => r.reviewerEmail !== session.user?.email);
      const totalRating = filteredReviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
      const newAverage = filteredReviews.length > 0 ? (totalRating / filteredReviews.length) : 0;

      await Product.findByIdAndUpdate(resolvedParams.id, {
        $set: {
          reviews: filteredReviews,
          rating: newAverage,
          reviewsCount: filteredReviews.length
        }
      });
    }

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error deleting review" }, { status: 500 });
  }
}

