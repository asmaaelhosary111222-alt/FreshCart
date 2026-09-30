import Image from "next/image";
import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface BrandResponse {
  data: Brand;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return (
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Brand not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't find the requested brand.
            </p>

            <Link
              href="/brands"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              Back to Brands
            </Link>
          </div>
        </main>
      );
    }

    const result: BrandResponse = await response.json();
    const brand = result.data;

    if (!brand) {
      return null;
    }

    return (
      <main>
        <section className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-green-50"
            >
              <Link
                href="/"
                className="transition-colors hover:text-white hover:underline"
              >
                Home
              </Link>

              <span aria-hidden="true">/</span>

              <Link
                href="/brands"
                className="transition-colors hover:text-white hover:underline"
              >
                Brands
              </Link>

              <span aria-hidden="true">/</span>

              <span
                aria-current="page"
                className="font-semibold text-white"
              >
                {brand.name}
              </span>
            </nav>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {brand.name}
            </h1>

            <p className="mt-2 text-green-50">
              Explore {brand.name}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl bg-gray-50 p-6">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={160}
                  height={160}
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-green-600">
                  Brand
                </p>

                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {brand.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {brand.slug}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Brand Name
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {brand.name}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Slug
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                  {brand.slug}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Brand ID
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                  {brand._id}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Created
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {new Date(brand.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/brands"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition-colors hover:border-green-300 hover:text-green-600"
              >
                Back to Brands
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please try again later.
          </p>

          <Link
            href="/brands"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-5 text-sm font-medium text-white hover:bg-green-700"
          >
            Back to Brands
          </Link>
        </div>
      </main>
    );
  }
}