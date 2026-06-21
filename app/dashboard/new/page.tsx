import { createBookAction } from "@/actions"

const NewBookPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) => {
  const { error } = await searchParams

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl font-bold text-primary-dark mb-2">
        Add a Book
      </h1>
      {error && (
        <p className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
          Please fill in title, author, category, and a valid price.
        </p>
      )}

       <form action={createBookAction} className="space-y-4">
        <Field name="title" label="Title" required />
        <Field name="author" label="Author" required />
 
        <div className="grid grid-cols-2 gap-4">
          <Field name="price" label="Price ($)" type="number" step="0.01" required />
          <Field name="stock" label="Stock" type="number" step="1" required />
        </div>
 
        <Field name="category" label="Category" placeholder="Fiction, Romance, Poetry..." required />
 
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-1">
            Cover image
          </label>
          <input
            type="file"
            name="cover"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="w-full rounded-lg border border-primary/20 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary-dark file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-secondary hover:file:bg-primary"
          />
          <p className="mt-1 text-xs text-primary-dark/40">
            JPEG, PNG, WebP, or AVIF, up to 5MB. Leave empty to use a placeholder.
          </p>
        </div>
 
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            required
            className="w-full rounded-lg border border-primary/20 px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
 
        <button
          type="submit"
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-medium text-secondary hover:bg-primary transition-colors"
        >
          Publish Book
        </button>
      </form>
    </div>
  )
}

function Field({
  name,
  label,
  type = "text",
  required,
  step,
  placeholder,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  step?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-dark mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-primary/20 px-3 py-2 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  )
}

export default NewBookPage